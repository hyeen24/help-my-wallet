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
import { listIncomes } from '@/src/graphql/queries';

const home = () => {
  const { theme, colorScheme } = useTheme();
  const isLoading = false; // Replace with actual loading state
  const client = generateClient();
  const [ incomes, setIncomes ] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      // console.log("Fetching data...");
      const result = await client.graphql({ query: listIncomes });
      // console.log("Data fetched:", result.data);
      const incomes = result.data.listIncomes.items;
      setIncomes(incomes);
 
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
            { paddingTop: 70, backgroundColor: theme.backgroundColor },
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
                  onPress={() => {}}
                >
                  <AntDesign name="left" size={16} color={theme.textColor} />
                </Button>
                {/* Current Month - Year*/}
                <Text style={{ color: theme.textColor }}>
                   Month - Year
                </Text>
                {/* Next Month */}
                <Button
                  style={{ backgroundColor: "transparent" }}
                  onPress={() => {}}
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
                    fontSize: 24,
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

            {/* <ExpenseBlock expenseList={expenseCategories} /> */}
            <IncomeBlock incomeList={incomes} onRefresh={fetchData} />
            {/* <TransactionBlock transactionList={transactions} /> */}
          </ScrollView>
          <TouchableOpacity
            style={styles.floatingAddBtn}
            onPress={() => {router.push("/addCategory")}}
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
