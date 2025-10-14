import { ListRenderItem, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { FontAwesome, FontAwesome5, Foundation } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useTheme } from '@/contexts/ThemeContext'
import { generateClient } from 'aws-amplify/api'
import { Income, Transaction } from '@/src/API'

const TransactionBlock = ({transactionList, incomeList}: {transactionList: Transaction[], incomeList: Income[]}) => {
    const appTheme = useColorScheme();
    const { theme } = useTheme();
    const router = useRouter();
    const client = generateClient();
   
  return (
    <View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
            <Text style={[styles.blockTitleTxt, {color: theme.textColor}]}>My 
                <Text style={{ fontWeight: 700 , color: theme.altTextColor}}> Transactions
                </Text>
            </Text>
            {   
                transactionList.length > 0 ?
                (<TouchableOpacity onPress={() => {router.push('/transaction')}}>
                    <Text style={{ color: theme.textColor, fontSize: 14}}>See all</Text>
                </TouchableOpacity>) : 
                null
            }
        </View>
        {
            transactionList && transactionList.length > 0 ? (
                transactionList.map((item) => {
                    const formattedDate = new Date(item.transaction_date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            });

                    const isIncome = incomeList.some((income) => income.id === item.category_id);
                    return (
                        <View key={item.id} style={[styles.transactionContainer, {backgroundColor: theme.backgroundColor}]}>
                            <View style={styles.iconContainer}>
                                <Foundation name="dollar" size={22} color={theme.textColor}/>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , backgroundColor: 'transparent'}}>
                                <View style={{ gap: 5 }}>
                                    <Text style={{color:theme.textColor, fontWeight: 700 }}>{item.description? item.title+" - "+item.description : item.title }</Text>
                                    <Text style={{color:theme.textColor}}>{formattedDate}</Text>
                                </View>
                                <Text style={{ fontWeight: 700 , color: isIncome? Colors.green : theme.textColor}}>{isIncome? "+ " : "- "}${Number(item.amount).toFixed(2)}</Text>
                            </View>      
                        </View>  
                    )

                })      
            ) : (
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ fontWeight: 400, color: Colors.white }}>No transaction record.</Text>
                </View>
            )
            
        }
        <View style={{ height : 50, justifyContent:'center', alignItems:'center', marginBottom: 80}}></View>
    </View>
  )
}

export default TransactionBlock

const styles = StyleSheet.create({
    expensBlockContainer : {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: 100,
        padding: 15,
        borderRadius: 15,
        marginRight: 20,
        gap : 8,
        marginBottom: 80        
    },
    blockTitleTxt: {
            fontSize: 16,
    },
    iconContainer : {
        backgroundColor: Colors.neutral800,
        width:40, 
        height:40, 
        padding: 10 , 
        borderRadius:50 ,
        marginRight: 10, 
        justifyContent:'center',
        alignItems: 'center'
    
    },
    transactionContainer: { 
        flexDirection: 'row', 
        margin: 2,
        alignItems:'center', 
        borderRadius: 16,
        height: 70,
        paddingHorizontal: 10
        },

})