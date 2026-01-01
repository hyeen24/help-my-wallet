import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { router, Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import { AntDesign, Feather, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import ExpenseBlock from '@/components/ExpenseBlock';
import IncomeBlock from '@/components/IncomeBlock';
import TransactionBlock from '@/components/TransactionBlock';
import { useTheme } from '@/contexts/ThemeContext';
import { generateClient } from 'aws-amplify/api';
import { listExpenses, listIncomes, listTransactions } from '@/src/graphql/queries';
import { list } from 'aws-amplify/storage';
import { PieChart } from 'react-native-gifted-charts';
import { IncomeTotals } from '@/types';

const home = () => {
  const { theme, colorScheme } = useTheme();
  const isLoading = false; // Replace with actual loading state
  const client = generateClient();
  const [ incomes, setIncomes ] = useState([]);
  const [ expenseList, setExpenseList ] = useState([]);
  const [ transactionList, setTransactionList ] = useState([]);
  const [ currentMonthName, setCurrentMonthName ] = useState(new Date().toLocaleString("en-US", { month: "long" }))
  const [ currentYear, setCurrentYear ] = useState(new Date().getFullYear())
  const [ currentMonth, setCurrentMonth ] = useState(new Date().getMonth() + 1)
  const [ balance, setBalance ] = useState(1234.56)

  useEffect(() => {
    fetchData();
  }, []);

  // Go to next month
  const goNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 12) {
        // wrap to January and increase year
        setCurrentYear((y) => y + 1);
        updateMonthName(1)
        return 1;
      }
      updateMonthName(prev+1)
      return prev + 1;
    });

  };

  // Go to previous month
  const goPrevMonth = () => {
    console.log("Go prev  month")
    setCurrentMonth((prev) => {
      if (prev === 1) {
        // wrap to December and decrease year
        setCurrentYear((y) => y - 1);
        updateMonthName(12)
        return 12;
      }
      updateMonthName(prev-1)
      return prev - 1;  
    });
  };

  //Update Month Name
  const updateMonthName = (month: number) => {
    const date = new Date(currentYear, month - 1); // JS months are 0-based
    setCurrentMonthName(date.toLocaleString("en-US", { month: "long" }));
  };

  // Fetch Data from backend
  const fetchData = async () => {
    try {
        const startDate = new Date(currentYear, currentMonth - 1, 1); // first day of month
        const endDate = new Date(currentYear, currentMonth, 0); 

      // Extracting Income group, expense group and all transactions
        const [incomeResult, expenseResult, transactionResult] = await Promise.all([
          client.graphql({ query: listIncomes, authMode: 'userPool', }),
          client.graphql({ query: listExpenses, authMode: 'userPool', }),
          client.graphql({ query: listTransactions , variables :{
            filter : {
              post_date : {
                between : [startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0] ]
              }
            }
          }, authMode: 'userPool',})
        ]);

        const incomes = incomeResult.data?.listIncomes?.items ?? [];
        const expenses = expenseResult.data?.listExpenses?.items ?? [];
        const transactions = transactionResult.data?.listTransactions?.items ?? [];

        console.log("Incomes fetched:", incomes);
        console.log("Expenses fetched:", expenses);
        console.log("Transactions:",transactions)
        // console.log(expenses)

        setIncomes(incomes);
        setExpenseList(expenses);
        setTransactionList(transactions);
       

      } catch (err) {
        console.error("Error fetching data:", err);
        Alert.alert("Error", err.message || "An error occurred");
      }
      

      try {
        const response = await list({
          prefix: 'photos/',
          options:  {
              accessLevel: 'private',
          }
        })
        // console.log('Listed Items:', response.items);
      } catch(error) {
        console.log('Error ',error);
      }  
    }

    useEffect(() => {
        fetchData();
      }, [currentMonth, currentYear]);
     const pieData = [
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

 const renderIncomes = () => {
  let incomeTotals = 0;

  incomes.forEach((income) => {
    const total = transactionList
      .filter((tx) => tx.category_id === income.id)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    incomeTotals += total;
  });

  return incomeTotals;
};

const renderExpenses = () => {
  const expenseTotals = 0;

  // Group & sum
  expenseList.forEach((expense) => {
    const total = transactionList
      .filter((tx) => tx.category_id === expense.id)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    expenseTotals
  });

    return expenseTotals
}
  
  // console.log("Has Zero Expense:",hasNonZeroExpenses)
  // console.log("OtherS:", othersTotal)
  



  
  // 
  return (
     <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <HomeHeader budget={0} />,
          headerTransparent: true  
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={[
            styles.container,
            { paddingTop: 80, backgroundColor: theme.backgroundColor },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 25}}></View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 80,
                  height: 30,
                  marginTop: 10,
                }}
              >
                <Button
                  style={{ backgroundColor: "transparent" }}
                  onPress={() => goPrevMonth()}
                >
                  <AntDesign name="left" size={16} color={theme.textColor} />
                </Button>
                <Text style={{ color: theme.textColor }}>
                  {currentMonthName} - {currentYear}
                </Text>
                <Button
                  style={{ backgroundColor: "transparent" }}
                  onPress={() => goNextMonth()}
                >
                  <AntDesign name="right" size={16} color={theme.textColor} />
                </Button>
              </View>
                <ImageBackground
                  source={require('../../assets/images/CardBackground.png')}
                  resizeMode='stretch'
                  style={{width: '100%', height:200}}
                  >
                    <View style={{marginHorizontal: 50, marginTop: 40}}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.white, fontSize: 14, fontWeight: 400}}>Total Balance</Text>
                         <Feather name="more-horizontal" size={20} color={Colors.white} />
                      </View>
                      <Text style={{fontSize:26, fontWeight: 700, color: Colors.white}}>${balance.toLocaleString('en-US')}</Text>
                      {/* Income & Expense Container*/}
                      <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 8}}>
                        {/* Income section in card*/}
                        <View style={{flex: 1}}>
                          <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{backgroundColor: '#555', padding:5, borderRadius: 15}}>
                              <FontAwesome6 name="circle-dollar-to-slot" size={12} color={Colors.white}/>
                            </View>
                            <Text style={{fontWeight: 400, fontSize:14, color:Colors.white, marginLeft: 8}}>Cash In</Text>
                          </View>
                          <Text>{JSON.stringify(renderIncomes())}</Text>
                        </View>

                        {/* Expense section in card*/}
                        <View>
                          <View style={{flexDirection: 'row', alignItems:'center',marginRight:8 }}>
                            <View style={{backgroundColor: '#555', padding:5, borderRadius: 15}}>
                              <MaterialCommunityIcons name="cash-fast" size={12} color={Colors.white}/>
                            </View>
                            <Text style={{fontWeight: 400, fontSize:14, color:Colors.white, marginLeft: 8}}>Cash Out</Text>
                          </View>
                        </View>
                      </View>
                      
                    </View>
                 
                </ImageBackground>

             
            </View>
            {/* <ExpenseBlock expenseList={expenseList} transactionList={transactionList} incomeList={incomes}/> */}
            <IncomeBlock incomeList={incomes} onRefresh={fetchData} />
            <TransactionBlock transactionList={transactionList} incomeList={incomes}/>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default home;

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
  line: {
    flex: 1,
    height: 1,
  },
});
