import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'
import Colors from '@/constants/Colors'
import { OTPInputProps } from '@/types'
import { useTheme } from '@/contexts/ThemeContext'

const OTPInput = ({
    setPinReady, 
    code, 
    setCode, 
    maxLength}: OTPInputProps) => {
    
    const { theme, colorScheme } = useTheme();
    const codeDigitsArray = new Array(maxLength).fill(0);
    const textInputRef = useRef(null);
    const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
 
    };

    const handleOnBlur = () => {
        setInputContainerIsFocused(false);
    }; 

    const toCodeDigitInput = (_value, index) => {
        const emptyInputChar = " ";
        const digit = code[index] || emptyInputChar;

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength -1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

       const styledOTPInput = inputContainerIsFocused && isDigitFocused 

        return (
            <TouchableOpacity style={styledOTPInput ? styles.codeContainerFocused : styles.codeContainer } key={index} onPress={handleOnPress}>
                <Text style={{color: theme.textColor}}>{digit}</Text>
            </TouchableOpacity>
        )
    };

    useEffect(()=> {
        // update pin ready value
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);
    }, [code]);

  return (
    <View>
        <View style={styles.mainContainer}>
            {codeDigitsArray.map(toCodeDigitInput)}
        </View>
        <TextInput style={styles.hidden}
            value={code}
            onChangeText={setCode}
            maxLength={maxLength}
            keyboardType='number-pad'
            returnKeyType='done'
            ref={textInputRef}
            onBlur={handleOnBlur}
            />
    </View>
    
  )
}

export default OTPInput


const styles = StyleSheet.create({
    mainContainer : {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10
    },
    codeContainer : {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.neutral300,
        borderRadius : 10,
        paddingHorizontal: 20
    },
    codeContainerFocused : {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor : Colors.neutral200,
        borderColor: Colors.neutral300,
        borderRadius : 10,
        paddingHorizontal: 20
    },
    input : {
        flex:1,
        fontSize: 20
    },
    hidden : {
        position: 'absolute',
        opacity: 0
    }
})