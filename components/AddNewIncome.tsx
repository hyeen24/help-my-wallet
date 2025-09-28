import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Input from "./Input";
import Colors from "@/constants/Colors";
import iconList from "@/data/icons.json";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./Button";
// import api from "@/app/api";
import { router } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { generateClient } from "aws-amplify/api";
import { useAuth } from "@/contexts/AuthContext";
import * as mutations from '../src/graphql/mutations';
import { FlipInEasyX } from "react-native-reanimated";
import { listReccurrences } from "@/src/graphql/queries";
import { CognitoUserPoolsAuthorizer } from "aws-cdk-lib/aws-apigateway";

const AddNewIncome = () => {
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconFamily, setIconFamily] = useState("");
  const [recurrence, setRecurrence] = useState<string | null>("once");
  const { theme } = useTheme();
  const [incomeAmount, setIncomeAmount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [ interval, setInterval ] = useState<number | null>(null);
  const [ description, setDescription ] = useState<string | null>("");
  const client = generateClient();
  const { user } = useAuth();

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  const selectRecurrence = (selected: string) => {
    if (selected === recurrence) {
      setRecurrence(null);
    } else {
      setRecurrence(selected);
    }
  };

  const displayStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const onChangeStartDate = (event: any, date?: Date) => {
    setShowStartDatePicker(false);
    if (date) {
      setStartDate(date);
    }
  };
  
  const createNewIncome = async () => {
    
    if (!categoryName || !incomeAmount || !icon || !startDate) {
      Alert.alert("Error", "Please filled up the required fields.")
      return
    }

    console.log(interval)
    if (recurrence != "once" && interval < 1) {
       Alert.alert("Error", "Recurrence value cannot be empty or 0.")
       return
    }

    if (recurrence === "Month" && interval > 11) {
       Alert.alert("Error", "Number of months for recurrence cannot exceed 11.")
       return
    }

    if (recurrence === "Day" && interval > 28) {
       Alert.alert("Error", "Number of days for recurrence cannot exceed 28.")
       return
    }

    try {
      // Retrieve recurrence_id from backend
      let recurrenceId: string | null = null;

      if (recurrence != "once") {
        const response = await client.graphql({
          query: listReccurrences,
          variables: { 
            filter : {
              type: { eq : recurrence?.toLocaleUpperCase()} ,
              value : { eq : interval?.toString()} 
            }
           }
        });
  
        recurrenceId = response.data.listReccurrences.items[0]?.id ?? null;
        console.log(recurrenceId)
      }

      const incomeDetails = {
          name: categoryName,
          recurrence_id: recurrenceId,
          start_date: startDate ? startDate.toISOString().split('T')[0] : "",
          active: true,
          amount: incomeAmount,
          icon : {
          icon_name: icon,
          icon_type: iconFamily,
          },
        }

      console.log(incomeDetails)

      const res = await client.graphql({
        query: mutations.createIncome,
        variables: {
          input: incomeDetails,
        },
        authMode: 'userPool',
      })

      // console.log(res)
        Alert.alert("New Income Added", "Your income has been added successfully.", [
          {
            text: "OK",
            onPress: () => router.push("/(tabs)/home"),
          },
        ]);

    } catch (error) {
      console.error("Error creating income:", error);
      Alert.alert("Error", "Failed to create income. Please try again.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={[styles.pageTitleTxt, {color: theme.textColor}]}>Add New Income</Text>
                    <Text style={[styles.pageTxt,  {color: theme.textColor, marginBottom: 8, marginLeft: 8 }]}>
                      Let's add a new income source for your{" "}
                      <Text style={{ fontWeight: 600 }}>account.</Text>
                    </Text>
        <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>
          Income Name
        </Text>
        <Input
          placeholder="Enter name of the income"
          onChangeText={(value) => {
            setCategoryName(value);
          }}
          iconLeft={
            <MaterialIcons name="category" size={18} color={theme.textColor} />
          }
        />
      </View>
      <View style={{ height: 500, marginTop: 8 }}>
        <View>
          <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>Amount</Text>
          <Input
            placeholder="Enter the amount"
            keyboardType="number-pad"
            onChangeText={(value) => {
              setIncomeAmount(value === "" ? null : Number(value));
            }}
            iconLeft={
              <FontAwesome name="dollar" size={18} color={theme.textColor} />
            }
          />
        </View>

        <View style={{ marginTop: 8}}>
          <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>Description</Text>
          <Input
            placeholder="Enter description"
            onChangeText={(value) => {
              setDescription(value);
            }}
            iconLeft={
              <MaterialIcons name="description" size={18} color={theme.textColor} />
            }
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>Category Icon</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {iconList.map((item) => {
            const iconName = item.iconName;
            const iconFamily = item.iconFamily;
            const isSelectedIcon = icon === iconName;
            return (
              <TouchableOpacity
                key={iconName}
                onPress={() => {
                  setIcon(iconName);
                  setIconFamily(iconFamily);
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    width: 40,
                    borderColor: "#666",
                    borderWidth: 1,
                    borderRadius: 50,
                    backgroundColor: isSelectedIcon ? Colors.tintColor : "transparent", 
                  }}
                >
                  {iconFamily === "FontAwesome6" && (
                    <FontAwesome6
                      name={iconName}
                      size={24}
                      color={isSelectedIcon ? Colors.white : theme.textColor}
                    />
                  )}
                  {iconFamily === "MaterialIcons" && (
                    <MaterialIcons
                      name={iconName}
                      size={24}
                      color={isSelectedIcon ? Colors.white :theme.textColor}
                    />
                  )}
                  {iconFamily === "MaterialCommunityIcons" && (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={24}
                      color={isSelectedIcon ? Colors.white :theme.textColor}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{ marginTop: 20 }}>
            <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>Recurrence</Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                style={[
                  styles.recurrenceSelectionContainer,
                  {
                    backgroundColor:
                      recurrence === "once" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "once" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("once")}
              >
                <Text style={{ color: recurrence === "once" ? Colors.white : theme.textColor }}>Once</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.recurrenceSelectionContainer,
                  {
                    backgroundColor:
                      recurrence === "Day" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "Day" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("Day")}
              >
                <Text style={{ color: recurrence === "Day" ? Colors.white : theme.textColor  }}>By Day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.recurrenceSelectionContainer,
                  {
                    backgroundColor:
                      recurrence === "Month" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "Month" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("Month")}
              >
                <Text style={{ color: recurrence === "Month" ? Colors.white : theme.textColor }}>By Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.recurrenceSelectionContainer,
                  {
                    backgroundColor:
                      recurrence === "Year" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "Year" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("Year")}
              >
                <Text style={{ color: recurrence === "Year" ? Colors.white : theme.textColor }}>By Year</Text>
              </TouchableOpacity>
            </View>
            { recurrence != "once" && (
              <View style={{ marginTop: 20 , flexDirection: "row",justifyContent:"flex-start", alignItems: "center", gap: 10 }}>
              <Text style={[styles.groupHeaderTxt, { color: theme.textColor, flex: 2 }]}>Every:</Text>
                <TextInput style={[styles.datePickerButton, {color: theme.textColor, flex:2, textAlign:"center"}]} 
                placeholder="Number" placeholderTextColor="#666" keyboardType="number-pad" onChangeText={(value) => setInterval(value)}/>
                <Text style={{ color: theme.textColor, flex: 4 }}>{recurrence}</Text>
            </View> )}
            <View style={{ marginTop: 20, gap: 10 }}>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center"}}
              >
                <Text
                  style={[
                    styles.groupHeaderTxt,
                    {color:theme.textColor , paddingBottom: 0, width: 80, flex:1 },
                  ]}
                >{ recurrence != "once" ? "Start Date:" : "Date:"}</Text>
                <TouchableOpacity
                  onPress={displayStartDatePicker}
                  style={[styles.datePickerButton, {flex: 3}]}
                >
                  <Text style={{ color: theme.textColor, textAlign: "center" }}>
                    {startDate
                      ? startDate.toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                    style={{ width: "100%" }}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 10 }}>
            <Button onPress={()=>createNewIncome()}>
              <Text style={[styles.groupHeaderTxt, {color: Colors.white}]}>Add Income</Text>
            </Button>
          </View>
        </View>
      </View>
      <View style={{height:50}}></View>
    </ScrollView>
  );
};

export default AddNewIncome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupHeaderTxt: {
    fontSize: 14,
    paddingBottom: 8,
    marginLeft: 8,
    fontWeight: 600,
  },
  recurrenceSelectionContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  datePickerButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#666",
    borderWidth: 1,
    padding: 5,
  },
  pageTitleTxt: {
      fontSize: 24,
      fontWeight: 700,
    },
    pageTxt: {
      fontSize: 12,
      marginBottom: 10,
    },
});
