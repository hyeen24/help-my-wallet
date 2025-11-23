import { StyleSheet, Text, TouchableOpacity, useColorScheme, View , Switch, Image} from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import PageHeader from '@/components/PageHeader';
import { darkTheme, lightTheme } from '@/constants/Theme';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { toTitleCase } from '@/utils/stringUtils';
import { profileOptionsType } from '@/types';

const profile = () => {
  const appTheme = useColorScheme();
  const Theme = appTheme === 'dark' ? darkTheme : lightTheme;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { user, signOutUser, userAttributes } = useAuth();
  const name = userAttributes?.name || user?.name || "User";
  const email = userAttributes?.email || user?.email || "No Email";
  const userImage = userAttributes?.picture || user?.picture || "Default";

  const profileOptions: profileOptionsType[] = [
    {
      title: 'Edit Profile',
      icon: <Ionicons name="person-circle-sharp" size={26} color={Colors.white} />,
      bgColor: '#6366f1'
    },
    {
      title: 'Settings',
      icon: <MaterialIcons name="settings" size={26} color={Colors.white} />,
      bgColor: '#059669'
    },
    {
      title: 'Privacy Policy',
      icon: <MaterialIcons name="policy" size={26} color={Colors.white} />,
      bgColor: Colors.neutral600
    },
    {
      title: 'Logout',
      icon: <MaterialIcons name="logout" size={26} color={Colors.white} />,
      bgColor: '#e11d48'
    }
  ]

  const handleOptionsPress = ( item: profileOptionsType) => {
    if (item.title === "Logout") {
      signOutUser()
    }
  }

  return (
    <>
        <Stack.Screen options={{headerShown: true,
          header: () => (<PageHeader title="Profile"/>),
            headerTransparent: true    
        }}/>
          <View style={[styles.container, { backgroundColor: Theme.backgroundColor }]}>
            <View style={{ marginTop : 20, justifyContent:'center', alignItems:'center'}}>
              <Image source={userImage === "Default"  ? require('../../assets/images/profile-circle-svgrepo-com.png') : { uri: userImage }} 
              style={{ alignSelf : 'center', height: 150, width: 150, borderRadius: 30}}/>
              <Text style={{fontWeight : 500, fontSize: 24}}>{toTitleCase(name)}</Text>
              <Text style={{fontSize: 14, color: '#777'}}>{email}</Text>

            </View>

            {/* Profile Options List */}
            <View style={{gap: 8}}>
              {
                profileOptions.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity style={{flexDirection: 'row', alignItems:'center', gap: 12 }} onPress={()=>handleOptionsPress(item)}>
                        <View style={[styles.listIcon, {backgroundColor: item.bgColor}]}>
                          {item.icon}
                        </View>
                        <Text style={{fontSize: 16}}>{item.title}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
              
            
            </View>
    </>
  )
}

export default profile

const styles = StyleSheet.create({
    container: {
      marginTop: 80,
      paddingTop: 10,
      flex: 1,
      paddingHorizontal: 10,
      gap: 18
        // backgroundColor moved to inline style in component
    },
    lineItemContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    lineItemTxt : {
      fontSize : 18
    },
    listIcon: {
      height: 44,
      width: 44,
      backgroundColor: Colors.neutral500,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      borderCurve: "continuous",
    }
})