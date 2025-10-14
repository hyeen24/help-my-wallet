import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import Input from '@/components/Input';
import { AntDesign, Feather } from '@expo/vector-icons';
import Button from '@/components/Button';
import { router } from 'expo-router';
import RetrieveEmail from '@/components/ResetPassword/RetrieveEmail';
import ResetPasswordComponent from '@/components/ResetPassword/ResetPasswordComponent';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/Colors';
import OTPInput from '@/components/OTPInput';
import { ConfirmResetPasswordInput } from 'aws-amplify/auth';

const resetPassword = () => {
  const { theme } = useTheme();
  const [emailConfirm, setEmailConfirm] = React.useState('');
  const { handleResetPassword, handleConfirmResetPassword } = useAuth();
  const [ resetPasswordStage, setResetPasswordStage ] = React.useState<'retrieve' | 'reset' | 'new'>('retrieve');
  const [newPassword, setNewPassword] = React.useState('');
  const [email, setEmail] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    console.log(emailConfirm)
    if (resetPasswordStage === 'reset' && emailConfirm) {
     handleResetPassword(emailConfirm)
    } 
    
  }, [resetPasswordStage]);

  
  
    const processCode = () => {
      if (code.length < 6) {
        alert("Please enter a valid 6-digit code.");
        return;
      }
      // Here you would typically handle the reset password logic
      setResetPasswordStage('new');
    };

    const processResetPassword = async () => {
          if (!email) {
              Alert.alert('Fail to reset', 'Email address is required.');
              return;
          }
          if (emailRegex.test(email) == false) {
              Alert.alert('Fail to Sign Up', 'Please enter a valid email address.');
          return;
          }
  
          setEmailConfirm(email.toLowerCase());      
          setResetPasswordStage('reset');
      }

  const processNewPassword = async () => {
    if ( !newPassword || !code || !confirmPassword) {
          Alert.alert('Fail to Sign Up', 'Please fill up all fields.');
          return;
        }

    if (newPassword !== confirmPassword) {
      Alert.alert('Fail to Sign Up', 'Passwords do not match.');
      return;
    }
    
    if (emailRegex.test(email) == false) {
      Alert.alert('Fail to Sign Up', 'Please enter a valid email address.');
      return;
    }
        
    if (newPassword.length < 8 ||
          !/[a-z]/.test(newPassword) ||       // no lowercase
          !/[A-Z]/.test(newPassword) ||       // no uppercase
          !/\d/.test(newPassword) ||          // no digit
          !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) // no special char
        ) {
          Alert.alert(
            'Fail to Sign Up',
            'Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.'
          );
          return;
        }

      console.log("Processing new password for email: ", emailConfirm);
      console.log("New Password: ", newPassword);
      console.log("Code: ", code);

      // Call the reset password API or function here
      const response = await handleConfirmResetPassword({
        username: emailConfirm,
        newPassword: newPassword,
        confirmationCode: code // Assuming this is the code sent to the email
      });

      console.log("Reset Password Response: ", response);

      if (response.success) {
        Alert.alert("Success", "Your password has been successfully reset.", [
          {
            text: "Login",
            onPress: () => {
              router.push("/(auth)/login");
            }
          }
        ]);
      } else {
        Alert.alert("Reset Password Failed", response.error.message);
      }
    }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Image
        source={require("../../assets/images/reset-password.png")}
        style={styles.image}
        resizeMode="center"
      />
      {resetPasswordStage === 'retrieve' ? (
        <>
          <View style={{ gap : 5}}>
          <Text style={{ fontSize: 30 , fontWeight: 800 , color: theme.titleText }}>Forget Your Password?</Text>
          <Text style={{ fontSize: 16, color: theme.textColor , textAlign:'center'}}>Please enter your email address.</Text>
          </View>
          <Input
          placeholder="Enter your email address"
          onChangeText={(value) => {setEmail(value)}}
          iconLeft={<Feather name='mail' size={18} color={theme.textColor} />}/>

          <Button style={styles.resetButton} onPress={processResetPassword}>
              <Text style={{ fontWeight: 700, color: Colors.white, fontSize: 21 }}>Reset Password</Text>
          </Button> 
        </>
        
      ) : null}
      {resetPasswordStage === 'reset' ? (
        <>
          <View style={{ gap : 5}}>
          <Text style={{ fontSize: 30 , fontWeight: 800 , color: theme.textColor }}>Forget Your Password?</Text>
          <Text style={{ fontSize: 16, color: theme.titleText , textAlign:'center'}}>We had sent a code to
            <Text style={{fontSize: 16, color:theme.textColor, fontWeight:400}}> {emailConfirm}</Text>.</Text>
          </View>
          <View style={styles.form}>
              <OTPInput
                setPinReady={setPinReady}
                code={code}
                setCode={setCode}
                maxLength={6}
              />
            </View>

          <Button style={styles.resetButton} onPress={processCode}>
              <Text style={{ fontWeight: 700, color: theme.textColor, fontSize: 21 }}>Continue</Text>
          </Button> 
        </>
      ) : null}
      {resetPasswordStage === 'new' ? (
        <View style={{ gap: 5 , width: '100%'}}>
          <Text style={{fontSize: 16, fontWeight: 400}}>New Password:</Text>
            <Input 
            placeholder="Enter your new password" 
            iconLeft={<AntDesign name='lock' size={18} color={theme.textColor}/>}
            secureTextEntry
            onChangeText={(value) => {setNewPassword(value)}}/>
          <Text style={{fontSize: 16, fontWeight: 400, marginTop: 10}}>Confirm New Password:</Text>
          <Input 
            placeholder="Confirm your new password" 
            secureTextEntry
            iconLeft={<AntDesign name='lock' size={18} color={theme.textColor}/>}
            onChangeText={(value) => {setConfirmPassword(value)}}/>
          <Button onPress={processNewPassword}>
            <Text style={{ fontWeight: 700, color: Colors.white, fontSize: 21 }}>Reset Password</Text>
          </Button>
        </View>
      
      ) : null}

      <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={() => {router.push('/(auth)/login')}}>
            <Text style={{ fontSize: 15, color: theme.textColor}}>Back to Login</Text>
        </TouchableOpacity>
    </View>
  )
}

export default resetPassword

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap : 20,
    paddingHorizontal: 20,
  },
  image : {
        alignSelf:'center',
        height: "20%",
        aspectRatio:1
    },
    form : {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
  resetButton : {
    width: '100%',
    padding: 10
  }
  
})