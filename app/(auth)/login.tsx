import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Colors from '@/constants/Colors'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import { AntDesign, Feather } from '@expo/vector-icons'
import { darkTheme, lightTheme } from '@/constants/Theme'
import { AuthContext, useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button'
import { router } from 'expo-router'

const login = () => {
     const { user, signInUser, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const appTheme = useColorScheme();
    const Theme = appTheme === 'dark' ? darkTheme : lightTheme;

    const handleSignIn = async () => {
    if(!email || !password){
      Alert.alert('Login','Please fill up all fields.')
      return;
    } 
    if (password.length < 8 ) {
          Alert.alert('Login','Please ensure password has the minimum length of 8 characters.')
          return;
        }
    
    console.log("email: ", email, "password: ", password)
    const isLoggedIn = await signInUser(email.toLowerCase() , password);
    console.log(email, password)
    console.log("isLoggedIn: ",isLoggedIn)
    if (user){
        router.push('/(tabs)/home')
      }
    } 

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <BackButton/>
            <View style={{gap:5, marginTop: 20}}>
              <Text style={styles.loginTxt1}>
                Hey,
              </Text>
              <Text style={styles.loginTxt1}>
                Welcome Back
              </Text>
            </View>

        <View style={styles.form}>
          <Text style={{ fontSize: 16, color: Colors.white}}>
            Login now to track all your expenses
          </Text>
          <Input 
          placeholder="Enter your email" 
          onChangeText={(value) => {setEmail(value)}}
          iconLeft={<Feather name='mail' size={26}
          color={Colors.white}/>}
          />
          <Input 
          placeholder="Enter your password" 
          secureTextEntry
          onChangeText={(value) => {setPassword(value)}}
          iconLeft={<AntDesign name='lock' size={26}
          color={Colors.white}/>}
          />
          {password.length < 8 && (
                        <Text style={{ fontSize: 15, color: Theme.textColor}} > {'\u2022'} Minimum 8 characters</Text>
                      )}
        </View>
        <Pressable onPress={() => {}}>
          <Text  style={{fontSize: 14, color: Colors.white, alignSelf: 'flex-end'}} >Forget Password?</Text>
        </Pressable>
        <Button loading={loading} onPress={handleSignIn}>
          <Text style={{ fontWeight: 700, color: Theme.textColor, fontSize: 21 }}>Login</Text>
        </Button> 

        <View style={styles.footer}>
          <Text style={{color: Theme.textColor, fontSize: 15 }}>Don't have an account?</Text>
          <Pressable onPress={()=> router.push('/(auth)/register')}>
            <Text style={{ fontSize: 15, fontWeight: 700, color : Theme.textColor
            }}>Sign up</Text>
          </Pressable>
        </View>

        </View>
    </ScreenWrapper>
  )
}

export default login
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
    loginTxt1 : {
      fontSize: 30,
      fontWeight: 800,
      color: Colors.white
    }
  });
  