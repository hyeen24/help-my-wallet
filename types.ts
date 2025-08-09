import { ReactNode } from "react";
import { TextInput, TextInputProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";


export interface ExpenseType {
    id: string;
    name: string;
    amount : string;
}

export interface IncomeType {
    id: string;
    name: string;
    amount: string;
    icon_type: string;
    icon:string;
}

export interface TransactionType {
    ref_number : number;
    description : string;
    trans_date : string;
    amount : string;
}

export interface DropDownItem {
  label: string;
  value: string | number;
}

export interface InputProps extends TextInputProps {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    inputRef?: React.RefObject<TextInput>;
    onPress?: () => void;
    // label?: string;
    // error?: string;
  }

  export type OptionItem = {
    value: string;
    label: string;
  };
  
  export interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
  }

export interface CustomButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    loading?: boolean;
    hasShadow?: boolean;
    children: React.ReactNode;
  }
  
export interface ButtonSpaceBetweenTwoItemProps extends TouchableOpacityProps {
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
leftTxt?: string;
rightTxt?: string;
onPress?: () => void;
}

export interface PageHeaderProps {
  title: string;
  rightButton?: React.ReactNode;
  onPress?: () => void;
}

  export interface CustomIconButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    icon?: React.ReactNode;
    loading?: boolean;
    hasShadow?: boolean;
    text?: string;
    focusable?: boolean;
    focused?: boolean;
    disabled?: boolean;
  }

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
  };

export type BackButtonProps = {
style?: ViewStyle;
iconSize?: number;
};

export type ChildrenProps = {
  children: ReactNode ;
}

export type Theme = {
  backgroundColor: string;
  textColor: string;
  cardColors: string;
  altTextColor: string;
};

export type AuthContextType = {
  user: any;
  loading: boolean;
  signInUser: (username: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  registerUser: (params: SignUpParameters) => Promise<void>;
};

export type SignUpParameters = {
  name: string;
  password: string;
  email: string;
  phone_number: string;
};

export type CodeConfirmationParameters = {
  username: string;
  confirmationCode: string;
};

export interface OTPInputProps extends TextInputProps {
    inputStyle?: TextStyle;
    setPinReady?: React.Dispatch<React.SetStateAction<boolean>>; 
    code?: string; 
    setCode?: any; 
    maxLength?: number;
  }