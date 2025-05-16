'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { checkIsUserAuthenticated } from '../_lib/auth';

interface AuthContextType {
  isUserAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    // Check if the user is authenticated when the component mounts
    (async function () {
      setIsLoading(true);
      try {
        const isAuthenticated = await checkIsUserAuthenticated();
        setIsUserAuthenticated(isAuthenticated.authenticated);
      } catch (error) {
        console.error('Error checking authentication status:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext must be used within an AuthProvider');

  return context;
}
