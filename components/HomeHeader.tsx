import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { AuthContext, useAuth } from '@/contexts/AuthContext'
import { toTitleCase } from '@/utils/stringUtils'
import { darkTheme, lightTheme } from '@/constants/Theme'
import { useTheme } from '@/contexts/ThemeContext'

const HomeHeader = ({ budget }: { budget: number }) => {
    const { user, signOutUser, userAttributes } = useAuth();
    const name = userAttributes?.name || user?.name || "User";
    const { theme } = useTheme();   

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.cardColors}]}>
        <View style={[styles.leftContainer, { backgroundColor: theme.cardColors}]}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>     
                <Image
                    source={require('../assets/images/react-logo.png')}
                    style={{ height: 50, width: 50, borderRadius: 30 }}
                />
                <View style={{ marginLeft: 10}}>
                    <Text style={{ color: Colors.white,  fontSize: 12}}>Hi, {toTitleCase(name)}</Text>
                    <Text style={{ color: Colors.white, fontSize: 16}}>Budget : ${budget}</Text>
                </View>
            </View >
            <TouchableOpacity onPress={signOutUser} style={{ 
                borderColor: '#666',
                borderWidth:1,
                padding: 8,
                borderRadius:10,
                }}>
                <Text style={{ color: Colors.white, fontSize: 12}}>Logout</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:70
    },
    leftContainer : {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        height: 70, 
        alignItems: 'center', 
        paddingHorizontal: 20
    }
})