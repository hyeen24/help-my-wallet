import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router, Tabs } from 'expo-router'
import * as NavigationBar from 'expo-navigation-bar';
import Colors from '@/constants/Colors'
import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, Octicons, SimpleLineIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useTheme } from '@/contexts/ThemeContext'
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Customize these based on your button
const NAVBAR_HEIGHT = 90;     // total height of the nav bar
const BUTTON_RADIUS = 25;     // half of button size (50px button)
const CURVE_WIDTH = 100;  

const Layout = () => {
  const { theme } = useTheme();

    function getDynamicPath() {
    const centerX = SCREEN_WIDTH / 2;
    const curveStart = centerX - CURVE_WIDTH / 2;
    const curveEnd = centerX + CURVE_WIDTH / 2;
    const dipDepth = BUTTON_RADIUS + 25; // how deep the curve goes (button radius + padding)

    return `
        M0 30
        L${curveStart} 30

        Q${curveStart + 15} 30 ${curveStart + 25} ${30 + dipDepth / 2}
        Q${centerX} ${30 + dipDepth} ${curveEnd - 25} ${30 + dipDepth / 2}
        Q${curveEnd - 15} 30 ${curveEnd} 30

        L${SCREEN_WIDTH} 30
        L${SCREEN_WIDTH} ${NAVBAR_HEIGHT}
        L0 ${NAVBAR_HEIGHT}
        Z
    `;
    }

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync('inset-swipe');
  }, []);

  const Screen = () => <View />;

  // Custom Tab Bar with Curved Background
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.tabBarContainer}>
        {/* SVG Curved Background */}
        <Svg
          width="100%"
          height="90"
          style={styles.svgCurve}
        >
          <Path
                d={getDynamicPath()}
                fill="#ffffff"
                />
        </Svg>

        {/* Tab Bar Items */}
        <View style={styles.tabBarContent}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const isMiddle = index === 2; // Center button

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (isMiddle) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.centerButtonContainer}
                  onPress={() => router.push("/addCategory")}
                >
                  <View style={styles.centerButton}>
                    <AntDesign name="plus" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabItem}
              >
                {options.tabBarIcon && options.tabBarIcon({ focused: isFocused })}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <>
      <ProtectedRoute>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Tabs
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => (
                <Octicons name='home-fill' size={18} color={focused ? Colors.tintColor : "#ccc"}/>
              ),
            }}
          />
          <Tabs.Screen
            name="transaction"
            options={{
              title: 'Transaction',
              tabBarIcon: ({ focused }) => (
                <AntDesign name="swap" size={18} color={focused ? Colors.tintColor : "#ccc"}/>
              ),
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: 'Add',
              tabBarIcon: () => null,
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: 'Account',
              tabBarIcon: ({ focused }) => (
                <Entypo name="wallet" size={18} color={focused ? Colors.tintColor : "#ccc"}/>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ focused }) => (
                <FontAwesome name="user" size={18} color={focused ? Colors.tintColor : "#ccc"}/>
              ),
            }}
          />
        </Tabs>
      </ProtectedRoute>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'relative',
    height: 90,
    backgroundColor: 'transparent',
  },
  svgCurve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarContent: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 18
  },
  centerButton: {
    width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: Colors.tintColor,
  justifyContent: 'center',
  alignItems: 'center',

  // iOS Shadow
  shadowColor: Colors.tintColor,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,

  // Android Shadow
  elevation: 8,
  },
});