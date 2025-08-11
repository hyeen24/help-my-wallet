import { View, Text, StyleSheet } from 'react-native'
import React, { cloneElement, useState } from 'react'
import { CustomIconButtonProps } from '@/types'
import { TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'
import Loading from './Loading'
import { useTheme } from '@/contexts/ThemeContext'

const CustomIconButton = ({
    style,
    onPress,
    icon,
    loading = false,
    text,
    focusable,
    focused = false, // add this
 }: CustomIconButtonProps) => {
    const { theme } = useTheme();

    if(loading) {
        return (
            <View style={[styles.button, style, { backgroundColor: 'transparent'}]}>
                <Loading/>
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={[
                styles.button,
                style,
                {
                    borderColor: focused ? Colors.tintColor : '#666',
                    backgroundColor: focused ? Colors.tintColor :'transparent',
                },
            ]}
            onPress={onPress}
        >
            {cloneElement(icon, {
                color: focused ? Colors.white : theme.textColor, // <-- color change
            })}
            <Text
                style={{
                    marginLeft: 10,
                    color: focused ? Colors.white : theme.textColor,
                    fontSize: 14,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};




export default CustomIconButton

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 'auto'
    }
});