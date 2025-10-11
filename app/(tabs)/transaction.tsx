import {Alert, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

const transaction = () => {
  const [merchantData, setMerchantData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('Date');
  const [ displayTransactions, setDisplayTransactions] = useState<any[]>([]);

  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const client = generateClient();

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
    <View style={{flex: 1 , backgroundColor: Colors.black}}>    
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
                color={Colors.white}/>}
            />
            <View>
                <Button style = {{ flexDirection:'row' ,width: 100, height: 30, backgroundColor: 'transparent', borderColor: Colors.white, borderWidth: 1, borderRadius: 30}}>
                    <Ionicons name="filter" size={16} color={Colors.white} style={{ marginRight: 5 }}/>
                    <Text style={styles.text}>Filter</Text>
                </Button>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                <View>
                    <Text style={{color: Colors.white}}>All</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 5, gap:5, justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{color: Colors.white}}>Sort By</Text>
                    <Dropdown  selected={sortBy} setSelected={setSortBy} defaultValue='Date' displayText={''} options={[
                  "Date" , "Amount"
                ]}/>
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
                    <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => selectTransaction(
                        merchant?.image ?? '',
                        merchant?.name ?? 'Unknown',
                        merchant?.id ?? '',
                        item.amount,
                        item.description,
                        formattedDate
                    )}>
                    
                            <View style={styles.iconContainer}>
                                { merchant && merchant.icon ? (
                                    // <Image
                                    //     source={{ uri: merchant.icon.replace('/media','/api/media') }}
                                    //     style={{ width: 50, height: 50, borderRadius: 10 }}/>
                                    undefined
                                    
                                    ) : (
                                        <Foundation name="dollar" size={22} color={Colors.white}/>
                                    )   
                                }
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <View style={{ gap: 5 }}>
                                    <Text style={[styles.spendingTxt, { fontWeight: 700 }]}>{ 
                                    item.description? `${item.title} - ${item.description}` : item.title 
                                    }</Text>
                                    <Text style={styles.spendingTxt}>{formattedDate}</Text>
                                </View>
                                <Text style={[styles.spendingTxt, { fontWeight: 700 }]}>${Number(item.amount).toFixed(2)}</Text>
                            </View>
                    </TouchableOpacity>  
                    );
                })): (
                    <View style={{ gap : 20}}>
                        <View style={{ marginTop: 20, alignItems : 'center', backgroundColor: Colors.grey, height: 50, justifyContent:'center', borderRadius:20}}>
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
           backgroundColor:Colors.black,
           gap: 16,
           paddingTop: 110,
           marginHorizontal:16,
       },
    text: {
        color: Colors.white

    },
    spendingTxt : {
        color: Colors.white
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
        borderRadius: 15,
        backgroundColor: Colors.grey, 
        height: 70,
        paddingHorizontal: 10,},
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
  }
})