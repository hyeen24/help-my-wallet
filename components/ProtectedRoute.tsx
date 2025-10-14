// components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading/>
      </View>
    );
  }

  if (!user && !loading) {
    useEffect(() => {  
       router.replace('/welcome'); // safe navigation after render
   }, []);
   return null;
  }


  return <>{children}</>;
}
