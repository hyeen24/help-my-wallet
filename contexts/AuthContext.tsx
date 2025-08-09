// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getCurrentUser, signIn, signOut, signUp, SignInInput, confirmSignUp } from 'aws-amplify/auth';
import { AuthContextType, CodeConfirmationParameters, SignUpParameters } from '@/types';



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

    try {
        const { isSignedIn, nextStep } = await signIn({username, password, options: {
     authFlowType: "USER_PASSWORD_AUTH",
}} as SignInInput);
        console.log('isSignedIn:', isSignedIn);
        console.log('nextStep:', nextStep);
    } catch (error) {
        
        console.log('error signing in:', error.message);
        return false;
    }
    // if (isSignedIn) {
    //   const currentUser = await getCurrentUser();
    //   console.log('User signed in:', currentUser);
    //   setUser(currentUser);
    // }
  };

  const signOutUser = async () => {
    await signOut();
    setUser(null);
  };

  const handleSignUpConfirmation = async (
        { username, confirmationCode }: CodeConfirmationParameters) => {
        try {
          const { isSignUpComplete, nextStep } = await confirmSignUp({
            username,
            confirmationCode
          });
          console.log(isSignUpComplete)
          console.log(nextStep)
          return {success: true};

        } catch (error) {
            let msg = error.message;
            return { success: false, msg}
        }
      }

  const registerUser = async (
    { name, password, email, phone_number }: SignUpParameters
    ) => {
        console.log('Registering user:', { name, email, phone_number, password });
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email,
                password: password,
                options: {
                    userAttributes: {
                        name: name,
                        phone_number: phone_number, // E.164 number convention
                    },
                },
            });

        return { success: { isSignUpComplete, userId, nextStep }, message: 'User registered successfully.' };
    } catch (error) {
        return {error: true, message: error.message || 'Failed to register user.' };
        }
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
