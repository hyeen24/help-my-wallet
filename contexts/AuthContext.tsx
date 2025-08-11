// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getCurrentUser, signIn, signOut, signUp, SignInInput, confirmSignUp, fetchUserAttributes , resetPassword,
  type ConfirmResetPasswordInput, confirmResetPassword
} from 'aws-amplify/auth';
import { AuthContextType, CodeConfirmationParameters, SignUpParameters } from '@/types';
import { router } from 'expo-router';



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ userAttributes, setUserAttributes ] = useState<Partial<Record<string, string>> | null>(null);

  // Check if user is already signed in
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        setUser(currentUser);
        setUserAttributes(userAttributes);

      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  const signInUser = async (username: string, password: string) => {
    setLoading(true);
    try {
        const { isSignedIn, nextStep } = await signIn(
          {
            username, 
            password, 
            options: {
                authFlowType: "USER_PASSWORD_AUTH",
                      }
          } as SignInInput);
          fetchUser();
        return { success: { isSignedIn, nextStep }, message: 'User signed in successfully.' };
    } catch (error) {
        return { error: { message: error.message || 'Failed to sign in user.' } };
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
    router.push('/(auth)/login'); // Redirect to login after sign out
  };

  const handleSignUpConfirmation = async (
        { username, confirmationCode }: CodeConfirmationParameters) => {
        try {
          console.log("username: ", username);
          console.log("confirmationCode: ", confirmationCode);
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
    { name, password, email}: SignUpParameters
    ) => {
        console.log('Registering user:', { name, email, password });
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email,
                password: password,
                options: {
                    userAttributes: {
                        name: name,
                    },
                },
            });

        return { success: { isSignUpComplete, userId, nextStep }, message: 'User registered successfully.' };
        } catch (error) {
            return { error: true, message: error.message || 'Failed to register user.' };
        }
    }   


  const handleResetPassword = async (username: string) => {
      try {
        const output = await resetPassword({ username });
        console.log("Reset Password Output: ", output);
        return output;
      } catch (error) {
        console.log(error);
      }
    }

  const handleConfirmResetPassword = async ({
      username,
      confirmationCode,
      newPassword
    }: ConfirmResetPasswordInput) =>{
      try {
        const res = await confirmResetPassword({ username, confirmationCode, newPassword });
        console.log("Reset Password Response: ", res);
        return { success: true, response: res };
      } catch (error) {
        return { error: { message: error.message || 'Failed to reset password.' } };
      }
    }

  return (
    <AuthContext.Provider value={{ 
                user, 
                loading, 
                signInUser, 
                signOutUser,
                registerUser, 
                handleSignUpConfirmation,
                handleResetPassword,
                handleConfirmResetPassword,
                userAttributes }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
