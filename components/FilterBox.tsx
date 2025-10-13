import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Dropdown from './Dropdown';
import Button from './Button';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import monthsData from '../data/months.json';
import { useTheme } from '@/contexts/ThemeContext';
import { FilterProps } from '@/types';
import Input from './Input';
import DateTimePicker from "@react-native-community/datetimepicker";
import { toDDMMYY } from '@/utils/dateUtils';

const FilterBox = (
    {filter,
    setFilter,
    displayFilterModal,
    setDisplayFilterModal,
    merchantData} : FilterProps
) => {
    const [ fromDate, setFromDate ] = useState<Date | null>(null);
    const [ toDate, setToDate ] = useState<Date | null>(null);
    const [ minAmount, setMinAmount ] = useState("");
    const [ maxAmount, setMaxAmount ] = useState("");
    const [ showStartDatePicker, setShowStartDatePicker ] = useState(false);
    const [ showEndDatePicker, setShowEndDatePicker ] = useState(false);
    const [ selectedMerchant, setSelectedMerchant ] = useState("");
    const [ transactionCategory, setTransactionCategory ] = useState("");

    const { theme } = useTheme();

    const handleResetFilter = () => {
        setFilter({
        transactionCategory: undefined,
        date : {
          from: null,
          to: null
        },
        amount: {
          min: null,
          max: null
        },
        merchant: undefined
      });
        setDisplayFilterModal(false);
    }

    const onChangeStartDate = (event: any, date?: Date) => {
        setShowStartDatePicker(false);
        if (date) {
            setFromDate(date);
        }
    };
    const onChangeEndDate = (event: any, date?: Date) => {
        setShowEndDatePicker(false);
        if (date) {
            setToDate(date);
        }
    };

    const handleApplyFilter = () => {
        setFilter({
            ...filter,
            date: {
                from: fromDate ?? filter.date.from,
                to: toDate ?? filter.date.to,
            },
            amount: {
                min: minAmount ?? filter.amount.min,
                max: maxAmount ?? filter.amount.max,
            },
            transactionCategory: transactionCategory ?? filter.transactionCategory,
            merchant: selectedMerchant ?? filter.merchant,
        });

    setDisplayFilterModal(false);
}



  return (
    <>
        <Modal
            transparent
            visible={displayFilterModal}
            animationType="fade"
            onRequestClose={() => setDisplayFilterModal(false)}
            >
            <View style={styles.overlay}>
                <View style={[styles.filterBoxContainer, {backgroundColor : theme.inactiveCardColors}] }>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={[styles.filterBoxTitle, {color: theme.textColor}]}>Filter</Text>
                        <TouchableOpacity onPress={() => handleResetFilter()}>
                        <Text style={{color: Colors.tintColor}}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator} />
                    <View style={{gap: 8}}>
                        <Text style={[styles.filterBoxTitle, {color : theme.textColor}]}>Transaction Category</Text>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <Button 
                                style={{
                                    ...styles.filterBoxCategoryContainer,
                                    borderColor: transactionCategory? "#ccc" : Colors.tintColor,
                                    backgroundColor: transactionCategory ? 'transparent' : Colors.tintColorOpacity
                                }}
                                onPress={() => setTransactionCategory("")}>
                                <FontAwesome name="navicon" size={14} color={transactionCategory?  theme.textColor: Colors.tintColor } />
                                <Text style={{ color: transactionCategory? theme.textColor :Colors.tintColor }}>All</Text>
                            </Button>
                            <Button 
                                style={{
                                    ...styles.filterBoxCategoryContainer,
                                    borderColor: transactionCategory === "expense" ? Colors.tintColor : "#ccc",
                                    backgroundColor: transactionCategory === "expense" ? Colors.tintColorOpacity : 'transparent'
                                }}
                                onPress={() => setTransactionCategory("expense")}>
                                <MaterialIcons name="payment" size={14} color={transactionCategory === "expense" ?  Colors.tintColor : theme.textColor } />
                                <Text style={{ color: transactionCategory=== "expense" ? Colors.tintColor : theme.textColor}}>Expense</Text>
                            </Button>
                            <Button 
                                style={{
                                    ...styles.filterBoxCategoryContainer,
                                    borderColor: transactionCategory === "income" ?  Colors.tintColor : "#ccc" ,
                                    backgroundColor: transactionCategory === "income" ?  Colors.tintColorOpacity : 'transparent' 
                                }}
                                onPress={() => setTransactionCategory("income")}>
                                <MaterialCommunityIcons name="piggy-bank-outline" size={14} color={transactionCategory === "income" ? Colors.tintColor : theme.textColor } />
                                <Text style={{ color: transactionCategory === "income" ? Colors.tintColor : theme.textColor }}>Income</Text>
                            </Button>
                            
                            
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.filterBoxTitle, {color : theme.textColor}]}>Amount</Text>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'center',marginRight: 10}}>Minimum</Text>
                                <View style={[styles.textInputContainer, {height: 40, justifyContent: 'flex-start', paddingLeft: 16}]}>
                                    <Text>$</Text>
                                    <TextInput 
                                        placeholder="No Min" 
                                        keyboardType='number-pad' 
                                        style={{color : theme.textColor}}
                                        onChangeText={(value) => setMinAmount(value)}/>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{textAlign:'center', marginRight: 10}}>Maximum</Text>
                                <View style={[styles.textInputContainer, {height: 40, justifyContent: 'flex-start', paddingLeft: 16}]}>
                                    <Text>$</Text>
                                    <TextInput 
                                        placeholder="No Max" 
                                        keyboardType='number-pad' 
                                        style={{color : theme.textColor}}
                                        onChangeText={(value) => setMaxAmount(value)}/>
                                </View>
                            </View>   
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.filterBoxTitle, {color : theme.textColor}]}>Merchant</Text>
                        <Dropdown
                            options={merchantData.map(merchant => merchant.name)}
                            selected={selectedMerchant}
                            setSelected={setSelectedMerchant} defaultValue={'None'} displayText={'None'} 
                            style={{display:'flex', height: 40 , borderWidth: 1, borderColor: "#ccc", borderRadius: 30, paddingTop: 8}}
                            />
                        
                    </View>
                    <View style={styles.filterInputContainer}>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', flex:1}}>
                            <View style={{ flex: 1, gap: 4}}>
                                <Text style={[styles.filterBoxTitle, {color : theme.textColor}]}>From Date</Text>
                                <TouchableOpacity 
                                    style={[ styles.textInputContainer, { padding: 10}]}
                                    onPress={() => setShowStartDatePicker(true)}>
                                    <Text style={{color: theme.textColor}}>{toDDMMYY(fromDate)}</Text>
                                    <Ionicons name='calendar-outline' size={16} color={theme.textColor}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, gap: 4}}>
                                <Text style={[styles.filterBoxTitle, {color : theme.textColor}]}>To Date</Text>
                                <TouchableOpacity 
                                    style={[ styles.textInputContainer, { padding: 10}]}
                                    onPress={() => setShowEndDatePicker(true)}>
                                    <Text style={{color: theme.textColor}}>{toDDMMYY(toDate)}</Text>
                                    <Ionicons name='calendar-outline' size={16} color={theme.textColor}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button style={{flex: 1 , height: 40, flexDirection:'row', gap: 20, marginTop: 10}} onPress={()=> handleApplyFilter()}>
                        <Text style={{color: Colors.white}}>Apply Filter</Text>
                        <Ionicons name="options-outline" size={16} color={Colors.white} />
                        </Button>
                    </View>
                    { showStartDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={onChangeStartDate}
                            style={{ width: "100%" }}
                            />
                        )
                    }
                    { showEndDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            minimumDate={fromDate}
                            onChange={onChangeEndDate}
                            style={{ width: "100%" }}
                            />
                        )
                    }
                </View>
            </View>
        </Modal>
    </>
  )
}

export default FilterBox

const styles = StyleSheet.create({
    filterLabel: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 14,
    marginBottom: 4,
  },
  filterInputContainer : {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  filterBoxCategoryContainer: {
    flexDirection:"row",
    gap:8, 
    height : 30, 
    paddingHorizontal: 10, 
    borderRadius: 30, 
    borderWidth: 1 
},
  filterBoxTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  filterBoxContainer: {
    width: 300,
    borderRadius: 16,
    padding: 20,
    gap: 8,
    elevation: 1, // shadow on Android
    shadowColor: "#000", // shadow on iOS
    shadowOffset: { width: 0, height:1 },
    shadowOpacity: 0.25,
    shadowRadius:4 ,
    backgroundColor: 'transparent'
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc", // light gray line
    width: "100%",
  },
  textInputContainer: {
    flexDirection: 'row', 
    alignItems:'center', 
    gap: 10, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    justifyContent: 'center', 
    marginRight: 10, 
    borderRadius: 30
  }
})