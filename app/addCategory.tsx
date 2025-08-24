import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { useTheme } from '@/contexts/ThemeContext'
import CustomIconButton from '@/components/CustomIconButton'
import { Entypo, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Input from '@/components/Input'

import AddNewIncome from '@/components/AddNewIncome'
import AddNewExpense from '@/components/AddNewExpense'
import AddNewMerchant from '@/components/AddNewMerchant'
import { generateClient } from 'aws-amplify/api'



const addCategory = () => {
  
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState<"income" | "expenses" | "merchant" | null>("income");
  const [categoryName, setCategoryName] = useState("");
  

  // Toggle between income, expenses, and merchant
  const toggleRadio = (type: "income" | "expenses" | "merchant") => {
    setSelectedType((prev) => (prev === type ? prev : type));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <>
          <PageHeader title="Category" />
          <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 10,
                justifyContent: "space-evenly",
                backgroundColor: theme.backgroundColor,
              }}
            >
              <CustomIconButton
                icon={
                  <MaterialCommunityIcons
                    name="gold"
                    size={18}
                    color={theme.textColor}
                  />
                }
                text="Income"
                focusable={true}
                focused={selectedType === "income"}
                onPress={() => toggleRadio("income")}
                style={{ borderRadius: 10 , width: 120}}
              />

              <CustomIconButton
                icon={
                  <FontAwesome6
                    name="hand-holding-dollar"
                    size={18}
                    color={theme.textColor}
                  />
                }
                text="Expenses"
                focusable={true}
                focused={selectedType === "expenses"}
                onPress={() => toggleRadio("expenses")}
                style={{ borderRadius: 10, width: 120 }}
              />
              <CustomIconButton
                icon={<Entypo name="shop" size={18} color={theme.textColor} />}
                text="Merchant"
                focusable={true}
                focused={selectedType === "merchant"}
                onPress={() => toggleRadio("merchant")}
                style={{ borderRadius: 10 , width: 120}}
              />
            </View>
            {selectedType === "income" && (
              <AddNewIncome/>
              )}

            {selectedType === "expenses" && (
              <AddNewExpense/>
            )}

            {selectedType === "merchant" && (
              <AddNewMerchant/>
            )}
          </View>
        </>
      
    </View>
  )
}

export default addCategory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    gap: 8,
  },
  pageTitleTxt: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: 700,
  },
  pageTxt: {
    color: Colors.white,
    fontSize: 12,
    marginBottom: 10,
  },
  groupHeaderTxt: {
    color: Colors.white,
    fontSize: 14,
    paddingBottom: 8,
    fontWeight: 600,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  colorContainer: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  }
})