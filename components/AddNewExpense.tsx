import { Alert, FlatList, ListRenderItem, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Input from './Input';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesome6, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { CreateExpenseGroupInput, CreateExpenseInput, CreateTransactionsInput, ExpenseGroup, TransactionType } from '@/src/API';
import { useAuth } from '@/contexts/AuthContext';
import Button from './Button';
import AddNewExpenseGroup from './AddNewExpenseGroup';
import Colors from '@/constants/Colors';
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../src/graphql/mutations';
import { router } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";

const AddNewExpense = ({ expenseGroups }: { expenseGroups?: ExpenseGroup[] }) => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const [ addNewGroup, setAddNewGroup ] = React.useState<boolean>(false);
    const [ categoryName, setCategoryName ] = React.useState("");
    const [ categoryColor, setCategoryColor ] = React.useState("#000000"); 
    const [ existingGroup, setExistingGroup ] = React.useState("None");
    const [ showDatePicker, setShowDatePicker] = React.useState(false);
    const [ selectedDate, setSelectedDate] = React.useState<Date | null>(new Date);
    const client = generateClient();

    const displayDatePicker = () => {
        setShowDatePicker(true);
    };


    const expenseGroupsWithNone = [
        {
            name: "None",
            id: "None"
        }, ...(expenseGroups || [])
    ]

    const [ expenseItem, setExpenseItem ] = React.useState<CreateTransactionsInput>({
        amount: 0.0,
        description: "",
        author_id: user.userId || "",
        category_id: "",
        transaction_date: new Date().toISOString().split('T')[0],
        transaction_type: TransactionType.DEBIT,
        merchantID: ""
    });

    

    const [newExpenseGroup, setNewExpenseGroup] = React.useState<CreateExpenseGroupInput>({
        name: "",
        author_id: user.userId || "",
        color: ""
    })

    const handleInputChange = (key: keyof CreateTransactionsInput, value: any) => {
        setExpenseItem((prev)=> ({
            ...prev,
            [key]: value
        }))
    }

    const onChangeDate = (event: any, date?: Date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            handleInputChange("transaction_date", date.toISOString().split('T')[0]);
        }
    }

    const handleNewGroup = () => {
        setAddNewGroup(prev => !prev);
        if (!addNewGroup) {
            setExistingGroup("None")
        }
    }

    const handleSelectExistingGroup = ({ item }: { item: ExpenseGroup }) => {
        setExistingGroup(item.id)
    }

    const handleNewExpense = async () => {
        if (expenseItem.description === "" || expenseItem.amount === 0) {
            Alert.alert("Error", "Description and amount of expense item is required.")
            return
        }
        
        if (addNewGroup && categoryName === "") {
            Alert.alert("Error", "Expense group name is required.")
            return
        }

        let expensegroupID = existingGroup;

        if (addNewGroup) {
            let payload = {
                name : categoryName,
                color: categoryColor,
                author_id : user.userId
            }

            const nameExists = expenseGroups?.some(
                (group) => group.name.toLowerCase() === categoryName.toLowerCase()
                );
            
            if (nameExists) {
                Alert.alert("Unable to create group", "Expense group already exist. Try selecting from existing group.")
                return
            } else {
                try {
                    const result = await client.graphql({
                        query: mutations.createExpenseGroup,
                        variables: { input: payload }
                    })

                    expensegroupID = result.data.createExpenseGroup.id

                } catch (error) {
                    Alert.alert("Error", error)
                }

                const expensePayload = {
                    ...expenseItem,
                    category_id: expensegroupID
                };

                try {
                    const result = await client.graphql({
                        query: mutations.createTransactions,
                        variables : { input : expensePayload }
                    })
                    Alert.alert("New Expense Group and Item Added", "Your expense has been updated successfully.", [
                          {
                            text: "OK",
                            onPress: () => router.push("/(tabs)/home"),
                          },
                        ]);
                } catch (error) {
                    Alert.alert("Error", error)
                }
            }    
        } else {
            let expensePayload = expenseItem

            if (existingGroup != "None" ) {
                expensePayload = {
                    ...expenseItem,
                    category_id: existingGroup
                }
            } 
            console.log(expensePayload)

            // try {
            //     const result = await client.graphql({
            //         query: mutations.createTransactions,
            //         variables : {
            //             input: expensePayload
            //         }
            //     })
            //     console.log(result)
            //     Alert.alert("New Expense Added", "Your expense has been updated successfully.", [
            //               {
            //                 text: "OK",
            //                 onPress: () => router.push("/(tabs)/home"),
            //               },
            //             ]);
            // } catch (error) {
            //     Alert.alert("Error Creating Expense", error)
            // }
        }    
    }

    // useEffect(()=>{
    //     console.log(existingGroup)
    // }, [existingGroup])

  return (
    <ScrollView style={styles.container}>
        <View>
            <Text style={[styles.pageTitleTxt, {color: theme.textColor}]}>Add New Expense</Text>
            <Text style={[styles.pageTxt,  {color: theme.textColor, marginBottom: 20 , marginLeft: 20}]}>
                Let's add a new expense item{" "}
                <Text style={{ fontWeight: 600 }}>account.</Text>
            </Text>
        </View>
        <View>
            
            
            {showDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    style={{ width: "100%" }}
                  />
                )}
        </View>
        <View style={{ gap: 5}}>
            <View style={{ flexDirection: 'row'}}>
                <Text style={[styles.groupHeaderTxt, {color: theme.textColor, flex:3}]}>Amount Spend</Text>
                <Text style={[styles.groupHeaderTxt, {color: theme.textColor, flex:4}]}>Date</Text>
            </View>
            <View style={{ flexDirection: 'row' , gap: 20}}>     
                <Input
                    placeholder="Amount"
                    keyboardType='number-pad'
                    style={{ flex :1, color: theme.textColor }}
                    onChangeText={(value) => {
                        handleInputChange("amount", value);
                    }}
                    iconLeft={
                        <FontAwesome6
                        name="circle-dollar-to-slot"
                        size={18}
                        color={theme.textColor}
                        />
                    }
                />
                    <Button style={{
                        backgroundColor: theme.backgroundColor , 
                        borderWidth:1, 
                        flex: 1,
                        borderColor: '#666', 
                        alignItems: 'flex-start',
                        }}
                        onPress={displayDatePicker}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 20,
                                paddingLeft: 15
                                    }}>
                                <FontAwesome6
                                    name="calendar-days"
                                    size={18}
                                    color={theme.textColor}
                                    />
                                    <Text style={{color: theme.textColor}}>{selectedDate ? selectedDate.toLocaleDateString("en-GB", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }) : ''}</Text>
                            </View>
                    </Button>
            </View>
        </View>
        <View style={styles.sectionContainer}>
            <Text style={[styles.groupHeaderTxt, {color: theme.textColor}]}>Description</Text>
            <Input
                placeholder="Enter Description"
                style={{ flex:1, color: theme.textColor }}
                onChangeText={(value) => {
                    handleInputChange("description", value);
                }}
                iconLeft={
                    <SimpleLineIcons
                    name="note"
                    size={18}
                    color={theme.textColor}
                    />
                }/>

        </View>
        <View style={[styles.sectionContainer, { flexDirection: 'row' ,justifyContent: 'space-between', marginBottom: 5, alignItems: 'flex-end'}]}>
            <Text style={[styles.groupHeaderTxt, {color: theme.textColor}]}>Expense Group</Text>
            <Button style={{height: 32, borderRadius: 50, paddingHorizontal: 10, marginRight: 10}} 
                            onPress={handleNewGroup}>  
                                {
                                    addNewGroup ? (
                                        <Text style={{color: theme.textColor}}> Select Existing Group</Text>
                                    ) : (
                                        <View style={ {flexDirection:'row'}} >
                                            <FontAwesome6 size={18} name="add" color={theme.textColor}/>
                                        </View>
                                    )
                                }
                                
            </Button>
        </View>
        <View>
            {/* <Input
                placeholder="Enter Amount"
                keyboardType='number-pad'
                onChangeText={(value) => {
                    handleInputChange("amount", value);
                }}
                iconLeft={
                    <FontAwesome6
                    name="circle-dollar-to-slot"
                    size={18}
                    color={theme.textColor}
                    />
                }
                /> */}
                {
                    addNewGroup ? (
                        <View style={{height: 200}}>
                            <AddNewExpenseGroup 
                                categoryName={categoryName} 
                                setCategoryName={setCategoryName}
                                categoryColor={categoryColor}
                                setCategoryColor={setCategoryColor}/>
                        </View>
                    ) : (
                        <View style={{flexDirection:'row'}}>
                            {expenseGroupsWithNone.length > 1 && expenseGroupsWithNone.map((item) => (
                                <TouchableOpacity
                                    key={item.id} 
                                    style={
                                        { 
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            padding: 15,
                                            borderRadius: 8,
                                            marginRight: 20,
                                            gap : 8,
                                            backgroundColor: existingGroup == item.id ? Colors.tintColor : theme.cardColors ,
                                            borderWidth : existingGroup == item.id ? 1: undefined,
                                            borderColor: existingGroup == item.id ? Colors.tintColor : undefined
                                        }
                                        
                                    }
                                    onPress={() => handleSelectExistingGroup({ item })}
                                    >
                                    <Text style={[styles.expenseBlockTitle, { color: theme.textColor }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )
                }
                {
                    expenseGroupsWithNone && expenseGroupsWithNone.length === 1 && !addNewGroup ? (
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 40}}>
                            <Text style={{color: '#ccc'}}> No Existing Group</Text>
                        </View>
                    ) : null
                }
            <View style={{marginTop: 20}}>
                <Button onPress={handleNewExpense}>
                    <Text style={[styles.groupHeaderTxt, {color:theme.textColor}]}>Add</Text>
                </Button>
            </View>
        </View>
    </ScrollView>
  )
}

export default AddNewExpense

const styles = StyleSheet.create({
    container: {
        height: 150, 
        gap: 50
    },
    groupHeaderTxt: {
        fontSize: 14,
        paddingBottom: 8,
        fontWeight: 600,
      },
    pageTitleTxt: {
      fontSize: 24,
      fontWeight: 700,
    },
    pageTxt: {
      fontSize: 12,
      marginBottom: 10,
    },
    sectionContainer: {
        marginTop: 20,
        gap:5
    },
    expenseBlockTitle: {
        fontSize: 12,
    },
})