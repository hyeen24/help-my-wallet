import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { AntDesign, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useTheme } from '@/contexts/ThemeContext'
import { Color } from 'aws-cdk-lib/aws-cloudwatch'

const Layout = () => {
    const { theme } = useTheme();

  return (
    <>
    <ProtectedRoute>
    <Tabs screenOptions={{
            tabBarStyle: {
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: Colors.tintColor,
                position: 'absolute',
                bottom: 40,
                height: 56,
                marginHorizontal: 100,
                paddingHorizontal: 10,
                paddingBottom: 8,
                paddingTop: 8,
                borderRadius: 40,
                borderWidth: 1,
                borderColor : 'transparent',
            },
            tabBarShowLabel: false,
            tabBarInactiveTintColor: '#999',
            tabBarActiveTintColor: Colors.white
        }}>

        <Tabs.Screen name='home' options={{ 
            tabBarIcon: ({color, focused}) => (
                <View style={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                    borderRadius: 30,
                    backgroundColor: focused ? theme.headerBackground : 'transparent',
                    borderColor: focused ? Colors.white: 'transparent',
                    borderWidth: 1,
                }}>
                    <SimpleLineIcons name='pie-chart' size={18} color={color}/>
                </View>
            )
         }} />
         <Tabs.Screen name='transaction' options={{ 
            tabBarIcon: ({color, focused}) => (
                <View style={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                    borderRadius: 30,
                    borderWidth: 1,
                    backgroundColor: focused ? theme.headerBackground : 'transparent',
                    borderColor: focused ? Colors.white: 'transparent',
                }}>
                    <AntDesign name="swap" size={18} color={color}/>
                </View>
            )
         }} />
         <Tabs.Screen name='profile' options={{ 
            tabBarIcon: ({color, focused}) => (
                <View style={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: 36,
                    width: 36,
                    borderRadius: 30,
                    borderColor: focused ? Colors.white: 'transparent',
                    borderWidth: 1,
                    backgroundColor: focused ? theme.headerBackground : 'transparent'
                }}>
                    <FontAwesome name="user-o" size={18} color={color}/>
                </View>
            )
         }} />
        </Tabs>
    <StatusBar style="light"/>
    </ProtectedRoute>
   </>
  )
}

export default Layout