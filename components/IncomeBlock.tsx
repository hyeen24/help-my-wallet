import { Alert, FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import  Colors  from '@/constants/Colors'
import { AntDesign, Feather, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { generateClient } from 'aws-amplify/api'
import * as mutations from '../src/graphql/mutations';
import { Income } from '@/src/API'

const IncomeBlock = ({incomeList, onRefresh} : {incomeList: Income[],  onRefresh: () => void }) => {
    const [showMore, setShowMore] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const { theme, colorScheme } = useTheme();
    const client = generateClient();

    const toggleShowMore = (item: any) => {
        if (showMore != item.id){
            setShowMore(item.id)
        }else {
            setShowMore("")
        }
        console.log("Income Id:",showMore)
        
    }

    const deleteIncome = async () => {
        // console.log("Deleting Income with ID:", showMore);
        try {
            const result = await client.graphql({ query: mutations.deleteIncome, variables: { input: { id: showMore } } });
            onRefresh();
        } catch (error) {
            Alert.alert("Error deleting income:", error);
            return;
        }

        
    }

    const renderItem: ListRenderItem<IncomeType> = ({ item }) => {
        // console.log("Item:", item);
        let str = item.amount.toString();
        let incomeAmountWholeNumber: string;
        let amount: string[];

        if (str.includes(".")) {
            let amountString = item.amount ?? "0.00";
            amount = amountString.split('.');
            incomeAmountWholeNumber = amount[0] || "0";
        } else {
            incomeAmountWholeNumber = item.amount || "0";
            let strWithDecimals = str + ".00";
            amount = strWithDecimals.split('.');
        }

        // console.log(item)

        let iconFamily = item.icon.icon_type;
        let iconName = item.icon.icon_name;

        return (
            <View>
                <View style={[styles.incomeCategoryContainerTop, { backgroundColor: "white" }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.categoryIconContainer}>
                            {!iconName || !iconFamily ? (
                                <Feather name="help-circle" size={22} color={theme.textColor} />
                            ) : iconFamily === 'FontAwesome6' ? (
                                <FontAwesome6 name={iconName} size={22} color={theme.textColor} />
                            ) : iconFamily === 'MaterialIcons' ? (
                                <MaterialIcons name={iconName as any} size={22} color={theme.textColor} />
                            ) : iconFamily === 'MaterialCommunityIcons' ? (
                                <MaterialCommunityIcons name={iconName as any} size={22} color={theme.textColor} />
                            ) : null}

                        </View>
                        <TouchableOpacity onPress={() => toggleShowMore(item)}>
                            <Feather name="more-horizontal" size={20} color={theme.textColor} />
                        </TouchableOpacity>
                        {
                            showMore == item.id ? (
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 999,
                                    backgroundColor: Colors.white,
                                    gap: 8,
                                    borderRadius: 5,
                                    paddingHorizontal: 16,
                                    paddingVertical: 16,
                                    alignItems: 'center',
                                    elevation:2,
                                    transform: [{
                                        translateY: 50,
                                        
                                    }, {
                                        translateX: 50
                                    }]
                                }}>
                                    <TouchableOpacity>
                                        <Text style={{ color: theme.textColor }}>Edit</Text>
                                    </TouchableOpacity>
                                    <View style={{ height: 1, backgroundColor: Colors.black }} />
                                    <TouchableOpacity onPress={deleteIncome}>
                                        <Text style={{ color: theme.textColor }}>Delete</Text>
                                    </TouchableOpacity>

                                </View>
                            ) : null
                        }

                    </View>
                    <Text style={{ color: theme.textColor, fontWeight: 500, fontSize: 16 }}>{item.name}</Text>
                    <Text style={[styles.incomeAmountWholeNumber, { color: theme.textColor }]}>${Number(incomeAmountWholeNumber).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}.
                        <Text style={[styles.incomeAmountDecimalNumber, { color: theme.textColor }]}>{amount[1]}</Text>
                    </Text>
                </View>
            </View>
        );
    }
  return (
    <View style={{ marginVertical: 5 }}>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <Text style={[styles.blockTitleTxt, {color: theme.textColor}]}>My 
                <Text style={{ fontWeight: 700, color: theme.altTextColor }}> Income
                </Text>
            </Text>
        </View>
        {
            incomeList.length === 0 ? (
                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ color: Colors.white , fontWeight: 400}}>No Income Category</Text>
                </View>
            ) : (
                <FlatList 
                    data={incomeList} 
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}/>
            )
        }
    </View>
  )
}

export default IncomeBlock

const styles = StyleSheet.create({
    blockTitleTxt: {
        fontSize: 16
    },
    incomeCategoryContainerTop : {
        elevation:1,
        margin:2,
        padding: 20, 
        borderRadius: 20, 
        marginRight: 15, 
        width: 150, 
        gap: 10
    },
    categoryIconContainer: {
        borderColor: '#ccc', 
        borderRadius: 50,
        padding: 10,
        borderWidth: 1,
        alignSelf: 'center',
    },
    incomeAmountWholeNumber: {
        fontSize: 16,
        fontWeight: 600
    },
    incomeAmountDecimalNumber: {
        fontSize: 12,
        fontWeight: 400
    },
     dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
})