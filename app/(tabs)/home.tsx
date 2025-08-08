import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const home = () => {
  return (
    <View>
      <Text>home</Text>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  floatingAddBtn: {
    backgroundColor: Colors.tintColor,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 12,
    bottom: 45,
    height: 40,
    width: 40,
    borderRadius: 50,
  },
})