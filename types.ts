import { ReactNode } from "react";
import { TextInput, TextInputProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";
import { type ConfirmResetPasswordInput } from "aws-amplify/auth";
import { Merchant } from "./src/API";

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
  activeCardColors: string;
  inactiveCardColors: string;
  altTextColor: string;
  navigationBarBackground: string;
  cardBorderColor: string;
  headerBackground: string;
  titleText: string;
};

export type AuthContextType = {
  user: any;
  loading: boolean;
  signInUser: (username: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  registerUser: (params: SignUpParameters) => Promise<
    | { success: { isSignUpComplete: boolean; userId: string | undefined; nextStep: any }; message: string }
    | { error: true; message: string }
  >;
  handleSignUpConfirmation: (params: CodeConfirmationParameters) => Promise<any>;
  handleResetPassword: (username: string) => Promise<any>;
  handleConfirmResetPassword: (params: ConfirmResetPasswordInput) => Promise<void>;
  userAttributes: Partial<Record<string, string>> | null;
};

export type SignUpParameters = {
  name: string;
  password: string;
  email: string;
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

export interface ResetPasswordsProps {
  emailConfirm: string;
  setEmailConfirm: (value: string) => void;
  setResetPasswordStage: (stage: "retrieve" | "reset" | "new") => void;
}

export type AddNewExpenseGroupProps = {
    categoryName: string;
    setCategoryName: (name: string) => void;
    categoryColor: string;
    setCategoryColor: (color: string) => void;
};

export type CreateTransactionsInput = {
    id?: string | null | undefined;
    post_date?: string | null | undefined;
    transaction_date: string;
    amount: number;
    description: string;
    created_at?: string | null | undefined;
    author_id: string;
    category_id?: string | null | undefined;
    transaction_type: TransactionType;
}

export type IncomeTotals = {
  [incomeId: string]: {
    total: number;
    icon_name: string;
    icon_type: string;
  };
};

export type DropdownProps = {
    defaultValue: string;
    displayText: string;
    options: string[];
    selected: string | null;
    setSelected: (value: string) => void;
    style?: ViewStyle;
}

export type TransactionFilter = {
    transactionCategory?: string,
    date?: {
        from?: Date | null;
        to?: Date | null;
    },
    amount?: {
        min?: number | null;
        max?: number | null;
    }
    merchant?: string;
}

export type FilterProps = {
    filter: (item: TransactionFilter) => void,
    setFilter: (item: TransactionFilter) => void,
    displayFilterModal: boolean,
    setDisplayFilterModal: (value: boolean) => void,
    merchantData: Merchant[],
}

export type profileOptionsType = {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}