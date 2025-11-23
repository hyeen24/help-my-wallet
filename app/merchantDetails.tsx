import { StyleSheet, Text, View, Image } from "react-native";
import React, { use, useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import PageHeader from "@/components/PageHeader";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { toTitleCase } from "@/utils/stringUtils";
import { BarChart } from "react-native-gifted-charts";
import ProtectedRoute from "@/components/ProtectedRoute";
import { generateClient } from "aws-amplify/api";
import { listMerchantTransactions, listTransactions } from "@/src/graphql/queries";

const merchantDetails = () => {
  const [merchantData, setMerchantData] = useState<any>({});
  const [transactions, setTransactions] = useState<any[]>([]);
  const [merchantName, setMerchantName] = useState<string>("");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { merchantId, merchantIcon } = useLocalSearchParams();
  const client = generateClient();

  console.log("merchantDetails.tsx :",merchantId)

  const fetchData = async () => {
    const [ merchantTransaction, transactions ] = await Promise.all([
      client.graphql({
            query: listMerchantTransactions,
            variables: {
              filter: {
                merchant_id: {
                  eq: merchantId
                }
              }
            },
            authMode: 'userPool'
          }),
      client.graphql({
        query: listTransactions,
        authMode: 'userPool'
      })
      
    ])

    const merchantTransactions = merchantTransaction?.data?.listMerchantTransactions?.items
    const allTransactions = transactions?.data?.listTransactions?.items
    const transactionsId = merchantTransactions.map((item: any) => item.transaction_id)
    const allTransactionsWithMerchant = allTransactions.filter((t: any) =>
        transactionsId.includes(t.id)
      );
    console.log("merchantDetails.tsx - transactionId:",allTransactionsWithMerchant)

    setTransactions(allTransactionsWithMerchant)

    setLoading(false);
  };

  const groupByYearMonth = (transactions: any[]) => {
  const result: Record<string, Record<string, number>> = {};
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  transactions.forEach(({ amount, post_date }) => {
    if (!post_date) return;

    const date = new Date(post_date);
    const year = date.getFullYear().toString();
    const monthStr = months[date.getMonth()]; // 0-based month index (0=Jan)

    if (!result[year]) {
      result[year] = {};
      for (const m of months) {
        result[year][m] = 0;
      }
    }

    result[year][monthStr] += parseFloat(amount);
  });

  return result;
};


  useEffect(() => {
    fetchData();
  }, []); // runs once on mount to fetch data

  useEffect(() => {
    if (transactions.length === 0) return;

    const grouped = groupByYearMonth(transactions);

    // Choose a year to show, e.g. the latest year
    const years = Object.keys(grouped);
    if (years.length === 0) return;

    const latestYear = years.sort().reverse()[0];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartDataForYear = months.map((month) => ({
      value: grouped[latestYear][month] ,
      frontColor: '#3BE9DE',
      gradientColor: "#009FFF",
      spacing: 12,
      label: month,
    }));

    setChartData(chartDataForYear);
  }, [transactions]);
  if (loading) {
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
        Loading...
      </Text>
    );
  }
  return (
    <ProtectedRoute>

    <View style={styles.container}>
      <PageHeader
        title="Merchant Details"
        rightButton={<AntDesign name="delete" size={22} color={Colors.white} />}
        onPress={() => {}}
      />
      <View style={styles.upperContainer}>
        <Image
          source={{
            uri: merchantData?.icon?.replace("/media", "/api/media"),
          }}
          style={styles.merchantImage}
        />
        <Text style={{ fontWeight: 700, fontSize: 24, color: Colors.white }}>
          {merchantName}
        </Text>
      </View>
      <View
        style={{
            justifyContent: "center",
            marginTop: 10,
            marginHorizontal: 10,
            padding: 10,
          borderRadius: 20,
          backgroundColor: "#232B5D",
        }}
      >
        <Text style={{ paddingLeft: 20, color: "white", fontSize: 16, fontWeight: "bold" }}>
          Spending Overview
        </Text>
        <View style={{ padding: 20, alignItems: "center" , paddingRight: 10, overflow: "hidden"}}>
          <BarChart
            data={chartData}
            barWidth={18}
            initialSpacing={0}
            barBorderRadius={4}
            yAxisThickness={0}
            xAxisType={"dashed"}
            xAxisColor={"lightgray"}
            yAxisTextStyle={{ color: "lightgray" }}
            noOfSections={6}
            labelWidth={18}
            xAxisLabelTextStyle={{ color: "lightgray", textAlign: "center" }}
            />
        </View>
      </View>
    </View>
    </ProtectedRoute>
  );
};

export default merchantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  merchantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  upperContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
