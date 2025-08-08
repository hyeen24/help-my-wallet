import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import PageHeader from '@/components/PageHeader'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const transaction = () => {
    const toggleModal = () => {
     
    }

  return (
    <View style={{flex: 1 , backgroundColor: Colors.black}}>    
       <Stack.Screen
        options={{headerShown: true,
          header: () => (<PageHeader title="My Transactions" rightButton={
            <MaterialCommunityIcons name='file-plus-outline' size={22} color={Colors.white}/>
            }
            onPress={toggleModal}/>),
            headerTransparent: true
        }}
        />
        
    </View>
  )
}

export default transaction

const styles = StyleSheet.create({})