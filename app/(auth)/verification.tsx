import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Input from '@/components/Input'
import Button from '@/components/Button'
import OTPInput from '@/components/OTPInput'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'


const verification = () => {
    // Inside the Verification component
    const params = useLocalSearchParams();
    const username = params.username; // Retrieve username

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState(false);
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");

    const { theme, colorScheme } = useTheme();


    const handleVerification = async () => {
        // Checks if code meets the requirement
        if (code.length < 6 ) {
            Alert.alert("Verification Error", "Verification code must be 6 digits.")
        } else {
            const response = await handleSignUpConfirmation(username.toString(), code)

            if (response.success == true) {
                router.navigate('/(auth)/login')
            } else {
                Alert.alert("Verification Failed", response.msg)
            }   
        }  
    }


  return (
    <ScreenWrapper>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/message.png")}
            style={styles.image}
            resizeMode="center"
          />
          <Text  style={{ fontSize:30, fontWeight:800, alignSelf: "center" , color: theme.textColor}}>
            Verify Your Email Address
          </Text>
          <View style={styles.form}>
            <OTPInput
              setPinReady={setPinReady}
              code={code}
              setCode={setCode}
              maxLength={6}
            />
          </View>

          <Button loading={isLoading} onPress={handleVerification}>
            <Text style={{fontWeight:700, color:theme.textColor, fontSize:21}}>
              Verify Email
            </Text>
          </Button>
          <Text style={{ alignSelf: "center", fontSize:15 , color: theme.textColor}}>
            Resend Code
          </Text>
        </View>
    </ScreenWrapper>
  );
}

export default verification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 30,
        paddingHorizontal: 20,
    },
    form : {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    image : {
        alignSelf:'center',
        height: "20%",
        aspectRatio:1
    }
})