import { Theme } from "@/types";
import Colors from "./Colors";

export const lightTheme: Theme = {
  backgroundColor: Colors.neutral100,
  textColor: Colors.black,
  activeCardColors: Colors.tintColor,
  inactiveCardColors: Colors.white,
  altTextColor: Colors.tintColor,
  cardBorderColor: Colors.tintColor,
  navigationBarBackground: Colors.lightTintColor,
};

export const darkTheme: Theme = {
  backgroundColor: Colors.black,
  textColor: Colors.white,
  activeCardColors: Colors.tintColor,
  inactiveCardColors: Colors.neutral700,
  altTextColor: Colors.cyan,
  cardBorderColor: '#333',
  navigationBarBackground: Colors.grey,
};