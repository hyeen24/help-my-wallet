import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
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

const AddNewIncome = () => {
  const [categoryName, setCategoryName] = useState("");
  const appTheme = useColorScheme();
  const [icon, setIcon] = useState("");
  const [iconFamily, setIconFamily] = useState("");
  const [recurrence, setRecurrence] = useState<string | null>(null);
  const { theme } = useTheme();
  const [incomeAmount, setIncomeAmount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const client = generateClient();
  const { user } = useAuth();
 
  

  useEffect(() => {
    setStartDate(new Date());
    setEndDate(new Date());
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

  const displayEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const onChangeStartDate = (event: any, date?: Date) => {
    setShowStartDatePicker(false);
    if (date) {
      setStartDate(date);
      setEndDate(date);
    }
  };

  const onChangeEndDate = (event: any, date?: Date) => {
    setShowEndDatePicker(false);
    if (date) {
      setEndDate(date);
    }

    if (date && startDate && date < startDate) {
      Alert.alert("Error", "End date cannot be before start date.");
      setEndDate(startDate); // Reset end date to start date
    }
  };
  
  const createNewIncome = async () => {
    // Here you would typically send the data to your backend or state management
    // console.log(user.userId, "User ID");

    if (!categoryName || !incomeAmount || !icon || !iconFamily) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const incomeDetails = {
      name: categoryName,
      amount: incomeAmount,
      icon : {
      Icon_name: icon,
      Icon_type: iconFamily,
      },
      recurrence: recurrence?.toUpperCase(),
      start_date: startDate ? startDate.toISOString().split('T')[0] : "",
      end_date: endDate ? endDate.toISOString().split('T')[0]  : null,
      author_id: user.userId || "",
    }

    // const calendarDetails = {
    //   date
    // }

    try {
      const response = await client.graphql({
        query: mutations.createIncome,
        variables: { input: incomeDetails }
      });
        Alert.alert("New Income Added", "Your income has been added successfully.", [
          {
            text: "OK",
            onPress: () => router.push("/(tabs)/home"),
          },
        ]);

      // const response = await client.graphql({
      //   query: mutations.createCalendar,

      // })
    } catch (error) {
      console.error("Error creating income:", error);
      Alert.alert("Error", "Failed to create income. Please try again.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={[styles.pageTitleTxt, {color: theme.textColor}]}>Add New Income</Text>
                    <Text style={[styles.pageTxt,  {color: theme.textColor, marginBottom: 20 }]}>
                      Let's add a new income source for your{" "}
                      <Text style={{ fontWeight: 600 }}>account.</Text>
                    </Text>
        <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>
          Income Name
        </Text>
        <Input
          placeholder="Enter category type"
          onChangeText={(value) => {
            setCategoryName(value);
          }}
          iconLeft={
            <MaterialIcons name="category" size={24} color={theme.textColor} />
          }
        />
      </View>
      <View style={{ height: 500, marginTop: 20 }}>
        <View>
          <Text style={[styles.groupHeaderTxt, { color: theme.textColor }]}>Amount</Text>
          <Input
            placeholder="Enter the amount"
            keyboardType="number-pad"
            onChangeText={(value) => {
              setIncomeAmount(value === "" ? null : Number(value));
            }}
            iconLeft={
              <FontAwesome name="dollar" size={22} color={theme.textColor} />
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
                    borderColor: isSelectedIcon ?  theme.textColor : "#666",
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
                      recurrence === "daily" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "daily" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("daily")}
              >
                <Text style={{ color: recurrence === "daily" ? Colors.white : theme.textColor  }}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.recurrenceSelectionContainer,
                  {
                    backgroundColor:
                      recurrence === "monthly" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "monthly" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("monthly")}
              >
                <Text style={{ color: recurrence === "monthly" ? Colors.white : theme.textColor }}>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.recurrenceSelectionContainer,
                  {
                    backgroundColor:
                      recurrence === "yearly" ? Colors.tintColor  : undefined,
                    borderColor:
                      recurrence === "yearly" ? Colors.tintColor : "#666",
                  },
                ]}
                onPress={() => selectRecurrence("yearly")}
              >
                <Text style={{ color: recurrence === "yearly" ? Colors.white : theme.textColor }}>Yearly</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, gap: 10 }}>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Text
                  style={[
                    styles.groupHeaderTxt,
                    {color:theme.textColor , paddingBottom: 0, width: 80 },
                  ]}
                >
                  Start Date:{" "}
                </Text>
                <TouchableOpacity
                  onPress={displayStartDatePicker}
                  style={styles.datePickerButton}
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
              {recurrence !== "once" && recurrence && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.groupHeaderTxt,
                      {color:theme.textColor ,paddingBottom: 0, width: 80 },
                    ]}
                  >
                    End Date:
                  </Text>
                  <TouchableOpacity
                    onPress={displayEndDatePicker}
                    style={styles.datePickerButton}
                  >
                    <Text
                      style={{ color: theme.textColor, textAlign: "center" }}
                    >
                      {endDate
                        ? endDate.toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {showEndDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeEndDate}
                  style={{ width: "100%" }}
                />
              )}
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
    fontWeight: 600,
  },
  recurrenceSelectionContainer: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  datePickerButton: {
    width: "70%",
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
