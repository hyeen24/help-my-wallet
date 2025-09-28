import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { router, Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import { AntDesign, Feather } from '@expo/vector-icons';
import ExpenseBlock from '@/components/ExpenseBlock';
import IncomeBlock from '@/components/IncomeBlock';
import TransactionBlock from '@/components/TransactionBlock';
import { useTheme } from '@/contexts/ThemeContext';
import { generateClient } from 'aws-amplify/api';
import { listExpenses, listIncomes, listTransactions } from '@/src/graphql/queries';
import { list } from 'aws-amplify/storage';

const home = () => {
  const { theme, colorScheme } = useTheme();
  const isLoading = false; // Replace with actual loading state
  const client = generateClient();
  const [ incomes, setIncomes ] = useState([]);
  const [ expenseList, setExpenseList ] = useState([]);
  const [ transactionList, setTransactionList ] = useState([]);
  const [dataDate, setDataDate] = useState<Date>(new Date());
  const [dataMonth, setDataMonth] = useState<string>(
    String(new Date().getMonth() + 1)
  );
  const [dataYear, setDataYear] = useState<string>(
    String(new Date().getFullYear())
  );
  const [dataMonthName, setDataMonthName] = useState<string>(
    new Date().toLocaleString("default", { month: "long" })
  );
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const [incomeResult, expenseResult, transactionResult] = await Promise.all([
          client.graphql({ query: listIncomes }),
          client.graphql({ query: listExpenses }),
          client.graphql({ query: listTransactions })
        ]);

        const incomes = incomeResult.data?.listIncomes?.items ?? [];
        const expenses = expenseResult.data?.listExpenses?.items ?? [];
        const transactions = transactionResult.data?.listTransactions?.items ?? [];

        console.log("Incomes fetched:", incomes);
        // console.log("Expenses fetched:", expenses);

        setIncomes(incomes);
        setExpenseList(expenses);
        setTransactionList(transactions);
        // console.log(expenses)

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
  
    const updateMonthData = (to: any) => {
      if (to === "next") {
        const nextMonthDate = new Date(dataDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

        const newDataMonthName = nextMonthDate.toLocaleString("default", {
          month: "long",
        });
        const newDataYear = String(nextMonthDate.getFullYear());
        const newDataMonth = String(nextMonthDate.getMonth() + 1); // Months are 0-indexed in JS

        setDataDate(nextMonthDate);
        setDataMonth(newDataMonth); // Months are 0-indexed in JS
        setDataYear(newDataYear);
        setDataMonthName(newDataMonthName);
        // console.log("Updated Month:", newDataMonth, "Year:", newDataYear, "Name:", newDataMonthName);
      }

      if (to === "previous") {
        const previousMonthDate = new Date(dataDate);
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

        const newDataMonthName = previousMonthDate.toLocaleString("default", {
          month: "long",
        });
        const newDataYear = String(previousMonthDate.getFullYear());
        const newDataMonth = String(previousMonthDate.getMonth() + 1); // Months are 0-indexed in JS

        setDataDate(previousMonthDate);
        setDataMonth(newDataMonth);
        setDataYear(newDataYear);
        setDataMonthName(newDataMonthName);
        console.log("Updated Month:", newDataMonth, "Year:", newDataYear, "Name:", newDataMonthName);
      }
      // fetchData();
    }
  
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
                {/* Previous Month */}    
                <Button
                  style={{ backgroundColor: "transparent" }}
                  onPress={() => updateMonthData("previous")}
                >
                  <AntDesign name="left" size={16} color={theme.textColor} />
                </Button>
                {/* Current Month - Year*/}
                <Text style={{ color: theme.textColor }}>
                   {dataMonthName} - {dataYear}
                </Text>
                {/* Next Month */}
                <Button
                  style={{ backgroundColor: "transparent" }}
                  onPress={() => updateMonthData("next")}
                >
                  <AntDesign name="right" size={16} color={theme.textColor} />
                </Button>
              </View>
              <View
                style={{
                  margin: 20,
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
                  Overview
                </Text>
                <View style={{ alignItems: "center" }}>
                  {/* <PieChart
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
                  /> */}
                </View>
                {}
              </View>
            </View>

            <ExpenseBlock expenseList={expenseList} transactionList={transactionList}/>
            <IncomeBlock incomeList={incomes} onRefresh={fetchData} />
            <TransactionBlock transactionList={transactionList} />
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
              color={colorScheme === "dark" ? "#ccc" : Colors.lightTintColor}
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
});
