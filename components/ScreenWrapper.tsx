import { View, Text, Dimensions, Platform, StatusBar } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

const {height} = Dimensions.get('window');

const ScreenWrapper = ({style, children}: ScreenWrapperProps) => {
    let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 50;

    const { theme } = useTheme();
  return (
    <View style={[{
        paddingTop,
        flex: 1,
        backgroundColor: theme.backgroundColor
        }, 
        style,
        ]}>
            <StatusBar barStyle="light-content"/>
            {children}
    </View>
  )
}

export default ScreenWrapper