import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import BackButton from '@/components/BackButton';
import ScreenWrapper from '@/components/ScreenWrapper';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { AuthContext, useAuth } from '@/contexts/AuthContext';
import { toTitleCase } from '@/utils/stringUtils';

const Register = () => {
  
  // variables
    const [name, setName] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [ email, setEmail ] = useState("");
  const { user, registerUser, loading } = useAuth();
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handling Register, It first checks the field then It will call the handleSignUp from Context
  const handleRegister = async () => {
    if (!email || !password || !phoneNumber) {
      Alert.alert('Fail to Sign Up', 'Please fill up all fields.');
      return;
    }

    if (phoneNumber.length < 8 || phoneNumber.length > 15) {
      Alert.alert('Fail to Sign Up', 'Please ensure phone number has the minimum length of 10 and maximum length of 15 characters.');
      return;
    }

    if (emailRegex.test(email) == false) {
      Alert.alert('Fail to Sign Up', 'Please enter a valid email address.');
      return;
    }
    
    if (password.length < 8 ) {
      Alert.alert('Fail to Sign Up','Please ensure password has the minimum length of 8 characters.')
      return;
    }

    const res = await registerUser({
        name: toTitleCase(name),
        email: email.toLowerCase(),
        phone_number: phoneNumber,
        password: password
    });

    console.log("res: ", res);
    
    if (res.success) {
        Alert.alert("Success", `Account created successfully.`, [
          {
            text: "Verify Email",
            onPress: () => {
              router.push({
                pathname: '/(auth)/verification',
                params: { username: email , verificationMethod: "Email"}, // Pass email as username
            });
            },
          },
        ]);
    } else {
        Alert.alert("Registration Failed", res.message);
    }
    

  }

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <BackButton/>
            <View style={{gap:5, marginTop: 5}}>
              <Text style={styles.registerTxt1}>Let's,</Text>
              <Text style={styles.registerTxt1}>Get Started</Text>
            </View>

        <View style={styles.form}>
          <Text style={{ fontSize: 16, color: Colors.white }}>
            Create an account to track your expenses
          </Text>
          <Input 
          placeholder="Enter your name" 
          onChangeText={(value) => {setName(value)}}
          iconLeft={<FontAwesome name='address-book' size={26}
          color={Colors.neutral300}/>}
          />
          <Input 
          placeholder="Enter your email" 
          onChangeText={(value) => {setEmail(value)}}
          iconLeft={<Feather name='mail' size={26}
          color={Colors.neutral300}/>}
          />
          <Input 
          placeholder="Enter your phone number" 
          onChangeText={(value) => {setPhoneNumber(value)}}
          iconLeft={<Feather name='phone' size={26}
          color={Colors.neutral300}/>}
          />
          <Input 
          placeholder="Enter your password" 
          secureTextEntry
          onChangeText={(value) => {setPassword(value)}}
          iconLeft={<AntDesign name='lock' size={26}
          color={Colors.neutral300}/>}
          />

          {password.length < 8 && (
              <Text style={{ fontSize: 15, color: Colors.white}} > {'\u2022'} Minimum 8 characters</Text>
            )}
          
        </View>

        <Button loading={loading} onPress={handleRegister}>
          <Text  style={{ fontWeight: 700, color: Colors.black, fontSize: 21}} >Sign Up</Text>
        </Button>

        <View style={styles.footer}>
          <Text style={{ fontSize: 15, color: Colors.white}}>Already have an account?</Text>
          <Pressable onPress={()=> router.navigate("/(auth)/login")}>
            <Text style={{ fontSize: 15, fontWeight: 700, color: Colors.white}} >Login</Text>
          </Pressable>
        </View>

        </View>
    </ScreenWrapper>
  )
}

export default Register;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 30,
      paddingHorizontal: 20,
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.white,
    },
    form: {
      gap: 20,
    },
    forgotPassword: {
      textAlign: "right",
      fontWeight: "500",
      color: Colors.white,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
    footerText : {
        textAlign: "center",
        color: Colors.white,
        fontSize: 15
    },
    registerTxt1 : {
      fontSize: 30,
      fontWeight: 800,
      color: Colors.white
    }
  })
  