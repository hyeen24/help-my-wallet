import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

        // console.log("Incomes fetched:", incomes);
        // console.log("Expenses fetched:", expenses);
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
    const incomeTotals: IncomeTotals = {};

    // Group & sum
    incomes.forEach((income) => {
      const total = transactionList
        .filter((tx) => tx.category_id === income.id)
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

        // console.log(income)

      incomeTotals[income.name] = {
        total,
        icon_name: income.icon?.icon_name ?? null, // default icon
        icon_type: income.icon?.icon_type ?? null // default type
      };
    });

    // console.log(incomeTotals)
    const hasNonZero = Object.values(incomeTotals).some(item => item.total !== 0);
    // console.log("HASNONZERO",hasNonZero)
    if (hasNonZero) {
      return Object.entries(incomeTotals).map(([source, info]) => (
        <View key={source} style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 8}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8}}>
            { info.icon_type &&  info.icon_type=== "MaterialCommunityIcons" ?
                <MaterialCommunityIcons name={info.icon_name ?? "help"} size={20} color={theme.textColor}/>
                : <FontAwesome6 name={info.icon_name ?? "question"} size={20} color={theme.textColor}/>
              }
            <Text style={{ color : theme.textColor}}>{source}</Text>
          </View>
          <Text style={{ color : theme.textColor }}>{info.total}</Text>
        </View>
      ));
    } else {
      return (
        <View style={{flexDirection: "row", justifyContent: "center",height: 50, alignItems : "center"}}>
            <Text style={{ color : "#bbb" }}>No Transactions</Text>
        </View>
      )
    }
  }

const renderExpenses = () => {
  const expenseTotals: { [incomeId: string]: number } = {};

  // Group & sum
  expenseList.forEach((expense) => {
    const total = transactionList
      .filter((tx) => tx.category_id === expense.id)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);

    expenseTotals[expense.title] = total;
  });

  // Handle uncategorized
  const othersTotal = transactionList
    .filter((tx) => tx.category_id === "")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const hasNonZeroExpenses = Object.values(expenseTotals).some(
    (total) => total !== 0
  );
  
  // console.log("Has Zero Expense:",hasNonZeroExpenses)
  // console.log("OtherS:", othersTotal)
  if (hasNonZeroExpenses || othersTotal) {
    return (
      <>
        {Object.entries(expenseTotals).map(([source, amount]) => (
          <View
            key={source}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#bbb" }}>{source}</Text>
            <Text style={{ color: "#bbb" }}>{amount}</Text>
          </View>
        ))}

        {othersTotal !== 0 && (
          <View
            key="others"
            style={{ flexDirection: "row", justifyContent: "space-between" , marginVertical: 6}}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {renderDot("#fff")}
              <Text style={{ color: "#fff" }}>Others</Text>
            </View>
            <Text style={{ color: "#fff" }}>${Number(othersTotal).toFixed(2)}</Text>
          </View>
        )}
      </>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#bbb" }}>No Transactions</Text>
      </View>
    );
  }
};


  
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
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 8,
                  padding: 16,
                  borderRadius: 20,
                  backgroundColor: "#232B5D",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: theme.altTextColor,
                  }}
                >
                  {currentMonthName} Overview
                </Text>
                <View style={{ alignItems: "center" , marginTop:8}}>
                  <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    focusOnPress
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={"#232B5D"}
                    centerLabelComponent={() => {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 22,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            47%
                          </Text>
                          <Text style={{ fontSize: 14, color: "white" }}>
                            Excellent
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16}}>
                  <View style={[styles.line, {backgroundColor : theme.altTextColor}]}/>
                  <Text style={{ fontSize: 14, fontWeight: 700, color: theme.altTextColor }}> Cash In </Text>
                  <View style={[styles.line, {backgroundColor : theme.altTextColor}]}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{ color : "#bbb" }}>Source</Text>
                    <Text style={{ color : "#bbb" }}>Amount</Text>
                </View>
                {
                  renderIncomes()
                }
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16}}>
                  <View style={[styles.line, {backgroundColor : theme.altTextColor}]}/>
                  <Text style={{ fontSize: 14, fontWeight: 700, color: theme.altTextColor }}> Cash Out </Text>
                  <View style={[styles.line, {backgroundColor : theme.altTextColor}]}/>
                </View>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{ color : "#bbb" }}>Top Categories</Text>
                    <Text style={{ color : "#bbb" }}>Amount Spent</Text>
                  </View>
                  {
                    renderExpenses()
                  }
                
              </View>
            </View>
            {/* <ExpenseBlock expenseList={expenseList} transactionList={transactionList} incomeList={incomes}/> */}
            <IncomeBlock incomeList={incomes} onRefresh={fetchData} />
            <TransactionBlock transactionList={transactionList} incomeList={incomes}/>
          </ScrollView>
          <TouchableOpacity
            style={styles.floatingAddBtn}
            onPress={() => {router.push({
              pathname: "/addCategory",
            params: {
              expenseList : JSON.stringify(expenseList)
            }})}}
          >
            <Feather
              name="plus"
              size={22}
              color={Colors.white}
            />
          </TouchableOpacity>
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
