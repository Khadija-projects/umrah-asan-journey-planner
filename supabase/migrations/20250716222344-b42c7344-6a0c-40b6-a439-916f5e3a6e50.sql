-- Fix infinite recursion in profiles RLS policies
-- Create a security definer function to check user roles safely
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  SELECT user_type FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create new admin policy using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR ALL 
TO authenticated
USING (public.get_current_user_role() = 'admin');

-- Ensure other policies are still correct and don't cause recursion
-- Update the existing policies to be more explicit and avoid potential recursion

-- Drop and recreate user policies to ensure they're clean
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Recreate user policies with explicit conditions
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);