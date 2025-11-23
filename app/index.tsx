import { StyleSheet, View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
import { generateClient } from 'aws-amplify/api';

Amplify.configure(amplifyconfig);
const client = generateClient();

const index = () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
                router.push("/(tabs)/profile");
                // router.push("/addCategory");
            }, 2000);
    },[])
  return ( 
      <View style={styles.container}>
        <Image 
        style={styles.logo} resizeMode="contain" source={require('../assets/images/splashimage.pnh.png')}/>
      </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.neutral900,
    },
    logo: {
        height: "20%",
        aspectRatio:1
    }
    
    });