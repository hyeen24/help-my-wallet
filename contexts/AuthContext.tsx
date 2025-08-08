// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import { AuthContextType } from '@/types';



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already signed in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signInUser = async (username: string, password: string) => {
    const { isSignedIn } = await signIn({ username, password });
    if (isSignedIn) {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
  };

  const signOutUser = async () => {
    await signOut();
    setUser(null);
  };

  const registerUser = async (username: string, password: string) => {
    // Implement registration logic here
    // This is a placeholder, actual implementation will depend on your backend
    console.log('Registering user:', username);
  }
  return (
    <AuthContext.Provider value={{ user, loading, signInUser, signOutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
