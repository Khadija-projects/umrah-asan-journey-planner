import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface CRMNavigationProps {
  title: string;
}

const CRMNavigation = ({ title }: CRMNavigationProps) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="/kaaba-watermark.png" 
            alt="Umrah Asan" 
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold text-primary">{title}</h1>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default CRMNavigation;