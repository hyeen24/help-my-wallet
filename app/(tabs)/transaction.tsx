import {Alert, Modal, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import PageHeader from '@/components/PageHeader'
import { AntDesign, Feather, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { generateClient } from 'aws-amplify/api'
import { listExpenses, listMerchants, listTransactions } from '@/src/graphql/queries'
import Dropdown from '@/components/Dropdown'
import FilterBox from '@/components/FilterBox'

const transaction = () => {
  const [merchantData, setMerchantData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [ displayFilterModal, setDisplayFilterModal] = useState(false);
  const monthNumber = new Date().getMonth(); // 0–11
  const monthName = new Date(0, monthNumber).toLocaleString('en-US', { month: 'long' });
  const [ filter, setFilter] = useState({
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

  const [sortBy, setSortBy] = useState('Date');
  const [ displayTransactions, setDisplayTransactions] = useState<any[]>([]);

  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const client = generateClient();
  const currentYear = new Date().getFullYear();

  // Generate years dynamically (5 before & 5 after current year)
  const yearOptions = Array.from({ length: 11 }, (_, i) => (currentYear - 5 + i).toString());

  const fetchData = async () => {
            const [ merchantResult, transactionResult ] = await Promise.all([
              client.graphql({ query : listMerchants, authMode: 'userPool' }),
              client.graphql({ query : listTransactions, authMode: 'userPool' }),
              client.graphql({ query : listExpenses, authMode: 'userPool' }),
            ])
            const transactions = transactionResult.data?.listTransactions?.items ?? [];
            const merchants = merchantResult.data?.listMerchants?.items ?? [];
            const expenses = merchantResult.data?.listExpenses?.items ?? [];

            setExpenses(expenses);
            setMerchantData(merchants)
            setTransactions(transactions);
            handleTransactionSorting(transactions);
            console.log(merchants)
            console.log(transactions)
        };

  useEffect(() => {   
        fetchData();
    }, []);

  useEffect(() => {   
        console.log(filter);
    }, [filter]);

  const handleTransactionSorting = ( inputTransactions : any ) => {
    if (sortBy === 'Date') {
            const sortedTransactions = [... inputTransactions].sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());
            setDisplayTransactions(sortedTransactions); 
            // console.log("Sorted by date");
        } else if (sortBy === 'Amount') {
            const sortedTransactions = [...inputTransactions].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
            setDisplayTransactions(sortedTransactions);
            // console.log("Sorted by amount");
        }
  }

  const handleSearch = (text: string) => {
        if (text.trim() === "") {
          setDisplayTransactions(transactions);
        } else {
            const filteredTransactions = transactions.filter((transaction) =>
                transaction.title.toLowerCase().includes(text.toLowerCase()) ||
                (transaction.description && transaction.description.toLowerCase().includes(text.toLowerCase()))
            );
            setDisplayTransactions(filteredTransactions);
        }
    }
  
  useEffect(() => {
        handleTransactionSorting(transactions);
    }, [sortBy]);

  const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

  const selectTransaction = (
        merchantIcon : string,
        merchantName: string,
        merchantId: string,
        itemAmount : string,
        itemDescription: string,
        transactionDate: string,
    ) =>{
        router.push({
            pathname: '/transactionDetails',
            params: {
                merchantIcon,
                merchantName,
                merchantId,
                itemAmount,
                itemDescription,
                transactionDate
            }
        }
      )};


  return (
    <View style={{flex: 1 , backgroundColor: theme.backgroundColor}}>    
       <Stack.Screen
        options={{headerShown: true,
          header: () => (<PageHeader title="My Transactions"/>),
            headerTransparent: true
        }}
        />
        <View style={styles.container}>
            <Input 
                placeholder="Search transactions" 
                onChangeText={(value) => {handleSearch(value)}}
                iconLeft={<Feather name='search' size={18}
                color={theme.textColor}/>}
            />
            <View>
                <FilterBox 
                    filter={filter}
                    setFilter={setFilter}
                    displayFilterModal={displayFilterModal}
                    setDisplayFilterModal={setDisplayFilterModal}
                    merchantData={merchantData}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                <View style={{ flex: 1}}>
                    <Button style = {{ flexDirection:'row' ,width: 100, height: 30, backgroundColor: 'transparent', borderColor: "#ccc", borderWidth: 1, borderRadius: 30}}
                      onPress={() => setDisplayFilterModal(true)}>
                      <Ionicons name="filter" size={16} color={"#666"} style={{ marginRight: 5 }}/>
                      <Text style={{color:"#666"}}>Filter</Text>
                  </Button>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 5, gap:5, justifyContent:'center', alignItems: 'center', flex: 1}}>
                    <Text style={{color: theme.textColor , flex:1 }}>Sort By</Text>
                    <View style={{flex:2}}>
                      <Dropdown  
                          selected={sortBy} 
                          setSelected={setSortBy} 
                          defaultValue="Date" 
                          displayText=""
                          options={["Date", "Amount"]}
                        />
                    </View>
                </View>
            </View>
             <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {
                    displayTransactions&& displayTransactions.length > 0 ? (
                displayTransactions.map((item) => {
                    // console.log("merchantData:", merchantData);
                    // console.log("Matching Merchant:",matchedMerchant.icon);
                    const merchant = item.merchantID ? merchantData.find(m => m.id === item.merchantID) : null;
                    // console.log(merchant)
                    const formattedDate = new Date(item.transaction_date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            });

                    return(
                    <TouchableOpacity key={item.id} style={[styles.itemContainer, {backgroundColor : theme.activeCardColors}]} onPress={() => selectTransaction(
                        merchant?.image ?? '',
                        merchant?.name ?? 'Unknown',
                        merchant?.id ?? '',
                        item.amount,
                        item.description,
                        formattedDate
                    )}>
                    
                            <View style={[styles.iconContainer, { backgroundColor: "#eee"}]}>
                                { merchant && merchant.icon ? (
                                    // <Image
                                    //     source={{ uri: merchant.icon.replace('/media','/api/media') }}
                                    //     style={{ width: 50, height: 50, borderRadius: 10 }}/>
                                    undefined
                                    
                                    ) : (
                                        <Foundation name="dollar" size={22} color={ theme.textColor }/>
                                    )   
                                }
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <View style={{ gap: 5 }}>
                                    <Text style={{ color: theme.textColor, fontWeight: 700 }}>{ 
                                    item.description? `${item.title} - ${item.description}` : item.title 
                                    }</Text>
                                    <Text style={{color: theme.textColor}}>{formattedDate}</Text>
                                </View>
                                <Text style={{color: theme.textColor, fontWeight: 700 }}>${Number(item.amount).toFixed(2)}</Text>
                            </View>
                    </TouchableOpacity>  
                    );
                })): (
                    <View style={{ gap : 20}}>
                        <View style={{ marginTop: 20, alignItems : 'center', backgroundColor: theme.activeCardColors, height: 50, justifyContent:'center', borderRadius:20}}>
                            <Text style={{ fontSize: 14, color: Colors.white}}>No transaction record.</Text>
                        </View>
                    </View>
                )}
                
            </ScrollView> 

        </View>
        
    </View>
  )
}

export default transaction

const styles = StyleSheet.create({
  container: {
           gap: 16,
           paddingTop: 110,
           marginHorizontal:16,
       },
    iconContainer : {
        width:50, 
        height:50, 
        padding: 10 , 
        borderRadius:50 ,
        marginRight: 10, 
        justifyContent:'center',
        alignItems: 'center'
    
    },
    itemContainer: { 
        flexDirection: 'row', 
        marginVertical: 3, 
        alignItems:'center', 
        borderRadius: 16,
        backgroundColor: Colors.grey, 
        height: 70,
        paddingHorizontal: 10,
        // IOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Anroid shadow
        elevation: 0.5,
      },
        centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  modalView: {
    backgroundColor: Colors.neutral200,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: '#f04a4a',
  },
  buttonUpload: {
    marginTop: 10,
    backgroundColor: Colors.tintColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontWeight : 400,
    marginBottom: 15,
    textAlign: 'center',
  },
  
  
  separator: {
    height: 1,
    backgroundColor: "#ccc", // light gray line
    width: "100%",
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
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
})