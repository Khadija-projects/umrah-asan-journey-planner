import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  nationality: string | null;
  user_type: 'guest' | 'admin' | 'partner';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isGuest: boolean;
  isAdmin: boolean;
  isPartner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('AuthContext: Fetching profile for user:', userId);
      setError(null);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('AuthContext: Error fetching profile:', error);
        setError('Failed to load profile');
        return;
      }

      console.log('AuthContext: Profile fetched successfully:', data);
      setProfile(data as Profile);
    } catch (error) {
      console.error('AuthContext: Error fetching profile:', error);
      setError('Failed to load profile');
    }
  };

  useEffect(() => {
    console.log('AuthContext: Initializing auth state...');
    
    // Set loading timeout fallback (10 seconds)
    const loadingTimeout = setTimeout(() => {
      console.log('AuthContext: Loading timeout reached, forcing loading to false');
      setLoading(false);
      setError('Authentication initialization timed out');
    }, 10000);

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('AuthContext: Auth state changed:', event, session ? 'Session exists' : 'No session');
        clearTimeout(loadingTimeout);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('AuthContext: User found, fetching profile...');
          // Use setTimeout to defer the profile fetch
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          console.log('AuthContext: No user, clearing profile');
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    console.log('AuthContext: Checking for existing session...');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthContext: Got session:', session ? 'Session exists' : 'No session');
      clearTimeout(loadingTimeout);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('AuthContext: User found in session, fetching profile...');
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    }).catch((error) => {
      console.error('AuthContext: Error getting session:', error);
      clearTimeout(loadingTimeout);
      setError('Failed to initialize authentication');
      setLoading(false);
    });

    return () => {
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });

    if (!error && data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: data.user.id,
            email,
            full_name: userData?.full_name,
            phone: userData?.phone,
            nationality: userData?.nationality,
            user_type: userData?.user_type || 'guest'
          }
        ]);

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isGuest: profile?.user_type === 'guest',
    isAdmin: profile?.user_type === 'admin',
    isPartner: profile?.user_type === 'partner'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};