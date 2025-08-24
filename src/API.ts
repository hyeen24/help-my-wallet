/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateExpenseInput = {
  id?: string | null,
  amount?: number | null,
  description?: string | null,
  author_id: string,
  expensegroupID: string,
};

export type ModelExpenseConditionInput = {
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  expensegroupID?: ModelIDInput | null,
  and?: Array< ModelExpenseConditionInput | null > | null,
  or?: Array< ModelExpenseConditionInput | null > | null,
  not?: ModelExpenseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Expense = {
  __typename: "Expense",
  id: string,
  amount?: number | null,
  description?: string | null,
  author_id: string,
  expensegroupID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateExpenseInput = {
  id: string,
  amount?: number | null,
  description?: string | null,
  author_id?: string | null,
  expensegroupID?: string | null,
};

export type DeleteExpenseInput = {
  id: string,
};

export type CreateCalendarInput = {
  id?: string | null,
  date?: string | null,
  type?: IncomeOrExpense | null,
  author_id: string,
  amount: number,
};

export enum IncomeOrExpense {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}


export type ModelCalendarConditionInput = {
  date?: ModelStringInput | null,
  type?: ModelIncomeOrExpenseInput | null,
  author_id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelCalendarConditionInput | null > | null,
  or?: Array< ModelCalendarConditionInput | null > | null,
  not?: ModelCalendarConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIncomeOrExpenseInput = {
  eq?: IncomeOrExpense | null,
  ne?: IncomeOrExpense | null,
};

export type Calendar = {
  __typename: "Calendar",
  id: string,
  date?: string | null,
  type?: IncomeOrExpense | null,
  author_id: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCalendarInput = {
  id: string,
  date?: string | null,
  type?: IncomeOrExpense | null,
  author_id?: string | null,
  amount?: number | null,
};

export type DeleteCalendarInput = {
  id: string,
};

export type CreateExpenseGroupInput = {
  id?: string | null,
  name: string,
  author_id: string,
  color?: string | null,
};

export type ModelExpenseGroupConditionInput = {
  name?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  color?: ModelStringInput | null,
  and?: Array< ModelExpenseGroupConditionInput | null > | null,
  or?: Array< ModelExpenseGroupConditionInput | null > | null,
  not?: ModelExpenseGroupConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ExpenseGroup = {
  __typename: "ExpenseGroup",
  id: string,
  name: string,
  author_id: string,
  color?: string | null,
  Expenses?: ModelExpenseConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelExpenseConnection = {
  __typename: "ModelExpenseConnection",
  items:  Array<Expense | null >,
  nextToken?: string | null,
};

export type UpdateExpenseGroupInput = {
  id: string,
  name?: string | null,
  author_id?: string | null,
  color?: string | null,
};

export type DeleteExpenseGroupInput = {
  id: string,
};

export type CreateIncomeInput = {
  id?: string | null,
  amount: number,
  name: string,
  author_id: string,
  icon?: IconInput | null,
  recurrence: IncomeRecurrence,
  start_date: string,
  end_date?: string | null,
};

export type IconInput = {
  Icon_name?: string | null,
  Icon_type?: string | null,
};

export enum IncomeRecurrence {
  ONCE = "ONCE",
  DAILY = "DAILY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
}


export type ModelIncomeConditionInput = {
  amount?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  recurrence?: ModelIncomeRecurrenceInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  and?: Array< ModelIncomeConditionInput | null > | null,
  or?: Array< ModelIncomeConditionInput | null > | null,
  not?: ModelIncomeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIncomeRecurrenceInput = {
  eq?: IncomeRecurrence | null,
  ne?: IncomeRecurrence | null,
};

export type Income = {
  __typename: "Income",
  id: string,
  amount: number,
  name: string,
  author_id: string,
  icon?: Icon | null,
  recurrence: IncomeRecurrence,
  start_date: string,
  end_date?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Icon = {
  __typename: "Icon",
  Icon_name?: string | null,
  Icon_type?: string | null,
};

export type UpdateIncomeInput = {
  id: string,
  amount?: number | null,
  name?: string | null,
  author_id?: string | null,
  icon?: IconInput | null,
  recurrence?: IncomeRecurrence | null,
  start_date?: string | null,
  end_date?: string | null,
};

export type DeleteIncomeInput = {
  id: string,
};

export type CreateMerchantInput = {
  id?: string | null,
  merchant_name: string,
  author_id: string,
  image?: string | null,
  category_id?: string | null,
  keywords?: Array< string | null > | null,
};

export type ModelMerchantConditionInput = {
  merchant_name?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  category_id?: ModelIDInput | null,
  keywords?: ModelStringInput | null,
  and?: Array< ModelMerchantConditionInput | null > | null,
  or?: Array< ModelMerchantConditionInput | null > | null,
  not?: ModelMerchantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Merchant = {
  __typename: "Merchant",
  id: string,
  merchant_name: string,
  author_id: string,
  image?: string | null,
  category_id?: string | null,
  keywords?: Array< string | null > | null,
  Transactions?: ModelTransactionsConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTransactionsConnection = {
  __typename: "ModelTransactionsConnection",
  items:  Array<Transactions | null >,
  nextToken?: string | null,
};

export type Transactions = {
  __typename: "Transactions",
  id: string,
  post_date?: string | null,
  transaction_date: string,
  amount: number,
  description: string,
  created_at?: string | null,
  author_id: string,
  category_id?: string | null,
  transaction_type: TransactionType,
  merchantID: string,
  createdAt: string,
  updatedAt: string,
};

export enum TransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}


export type UpdateMerchantInput = {
  id: string,
  merchant_name?: string | null,
  author_id?: string | null,
  image?: string | null,
  category_id?: string | null,
  keywords?: Array< string | null > | null,
};

export type DeleteMerchantInput = {
  id: string,
};

export type CreateTransactionsInput = {
  id?: string | null,
  post_date?: string | null,
  transaction_date: string,
  amount: number,
  description: string,
  created_at?: string | null,
  author_id: string,
  category_id?: string | null,
  transaction_type: TransactionType,
  merchantID: string,
};

export type ModelTransactionsConditionInput = {
  post_date?: ModelStringInput | null,
  transaction_date?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  created_at?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  category_id?: ModelIDInput | null,
  transaction_type?: ModelTransactionTypeInput | null,
  merchantID?: ModelIDInput | null,
  and?: Array< ModelTransactionsConditionInput | null > | null,
  or?: Array< ModelTransactionsConditionInput | null > | null,
  not?: ModelTransactionsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTransactionTypeInput = {
  eq?: TransactionType | null,
  ne?: TransactionType | null,
};

export type UpdateTransactionsInput = {
  id: string,
  post_date?: string | null,
  transaction_date?: string | null,
  amount?: number | null,
  description?: string | null,
  created_at?: string | null,
  author_id?: string | null,
  category_id?: string | null,
  transaction_type?: TransactionType | null,
  merchantID?: string | null,
};

export type DeleteTransactionsInput = {
  id: string,
};

export type ModelExpenseFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  expensegroupID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelExpenseFilterInput | null > | null,
  or?: Array< ModelExpenseFilterInput | null > | null,
  not?: ModelExpenseFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCalendarFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  type?: ModelIncomeOrExpenseInput | null,
  author_id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCalendarFilterInput | null > | null,
  or?: Array< ModelCalendarFilterInput | null > | null,
  not?: ModelCalendarFilterInput | null,
};

export type ModelCalendarConnection = {
  __typename: "ModelCalendarConnection",
  items:  Array<Calendar | null >,
  nextToken?: string | null,
};

export type ModelExpenseGroupFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  color?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelExpenseGroupFilterInput | null > | null,
  or?: Array< ModelExpenseGroupFilterInput | null > | null,
  not?: ModelExpenseGroupFilterInput | null,
};

export type ModelExpenseGroupConnection = {
  __typename: "ModelExpenseGroupConnection",
  items:  Array<ExpenseGroup | null >,
  nextToken?: string | null,
};

export type ModelIncomeFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  recurrence?: ModelIncomeRecurrenceInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelIncomeFilterInput | null > | null,
  or?: Array< ModelIncomeFilterInput | null > | null,
  not?: ModelIncomeFilterInput | null,
};

export type ModelIncomeConnection = {
  __typename: "ModelIncomeConnection",
  items:  Array<Income | null >,
  nextToken?: string | null,
};

export type ModelMerchantFilterInput = {
  id?: ModelIDInput | null,
  merchant_name?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  category_id?: ModelIDInput | null,
  keywords?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMerchantFilterInput | null > | null,
  or?: Array< ModelMerchantFilterInput | null > | null,
  not?: ModelMerchantFilterInput | null,
};

export type ModelMerchantConnection = {
  __typename: "ModelMerchantConnection",
  items:  Array<Merchant | null >,
  nextToken?: string | null,
};

export type ModelTransactionsFilterInput = {
  id?: ModelIDInput | null,
  post_date?: ModelStringInput | null,
  transaction_date?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  created_at?: ModelStringInput | null,
  author_id?: ModelIDInput | null,
  category_id?: ModelIDInput | null,
  transaction_type?: ModelTransactionTypeInput | null,
  merchantID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTransactionsFilterInput | null > | null,
  or?: Array< ModelTransactionsFilterInput | null > | null,
  not?: ModelTransactionsFilterInput | null,
};

export type ModelSubscriptionExpenseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  description?: ModelSubscriptionStringInput | null,
  author_id?: ModelSubscriptionIDInput | null,
  expensegroupID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExpenseFilterInput | null > | null,
  or?: Array< ModelSubscriptionExpenseFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCalendarFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  date?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  author_id?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCalendarFilterInput | null > | null,
  or?: Array< ModelSubscriptionCalendarFilterInput | null > | null,
};

export type ModelSubscriptionExpenseGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  author_id?: ModelSubscriptionIDInput | null,
  color?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExpenseGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionExpenseGroupFilterInput | null > | null,
};

export type ModelSubscriptionIncomeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  name?: ModelSubscriptionStringInput | null,
  author_id?: ModelSubscriptionIDInput | null,
  recurrence?: ModelSubscriptionStringInput | null,
  start_date?: ModelSubscriptionStringInput | null,
  end_date?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionIncomeFilterInput | null > | null,
  or?: Array< ModelSubscriptionIncomeFilterInput | null > | null,
};

export type ModelSubscriptionMerchantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  merchant_name?: ModelSubscriptionStringInput | null,
  author_id?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  category_id?: ModelSubscriptionIDInput | null,
  keywords?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMerchantFilterInput | null > | null,
  or?: Array< ModelSubscriptionMerchantFilterInput | null > | null,
};

export type ModelSubscriptionTransactionsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  post_date?: ModelSubscriptionStringInput | null,
  transaction_date?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  description?: ModelSubscriptionStringInput | null,
  created_at?: ModelSubscriptionStringInput | null,
  author_id?: ModelSubscriptionIDInput | null,
  category_id?: ModelSubscriptionIDInput | null,
  transaction_type?: ModelSubscriptionStringInput | null,
  merchantID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTransactionsFilterInput | null > | null,
  or?: Array< ModelSubscriptionTransactionsFilterInput | null > | null,
};

export type CreateExpenseMutationVariables = {
  input: CreateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type CreateExpenseMutation = {
  createExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateExpenseMutationVariables = {
  input: UpdateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type UpdateExpenseMutation = {
  updateExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteExpenseMutationVariables = {
  input: DeleteExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type DeleteExpenseMutation = {
  deleteExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCalendarMutationVariables = {
  input: CreateCalendarInput,
  condition?: ModelCalendarConditionInput | null,
};

export type CreateCalendarMutation = {
  createCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCalendarMutationVariables = {
  input: UpdateCalendarInput,
  condition?: ModelCalendarConditionInput | null,
};

export type UpdateCalendarMutation = {
  updateCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCalendarMutationVariables = {
  input: DeleteCalendarInput,
  condition?: ModelCalendarConditionInput | null,
};

export type DeleteCalendarMutation = {
  deleteCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateExpenseGroupMutationVariables = {
  input: CreateExpenseGroupInput,
  condition?: ModelExpenseGroupConditionInput | null,
};

export type CreateExpenseGroupMutation = {
  createExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateExpenseGroupMutationVariables = {
  input: UpdateExpenseGroupInput,
  condition?: ModelExpenseGroupConditionInput | null,
};

export type UpdateExpenseGroupMutation = {
  updateExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteExpenseGroupMutationVariables = {
  input: DeleteExpenseGroupInput,
  condition?: ModelExpenseGroupConditionInput | null,
};

export type DeleteExpenseGroupMutation = {
  deleteExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateIncomeMutationVariables = {
  input: CreateIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type CreateIncomeMutation = {
  createIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateIncomeMutationVariables = {
  input: UpdateIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type UpdateIncomeMutation = {
  updateIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteIncomeMutationVariables = {
  input: DeleteIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type DeleteIncomeMutation = {
  deleteIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMerchantMutationVariables = {
  input: CreateMerchantInput,
  condition?: ModelMerchantConditionInput | null,
};

export type CreateMerchantMutation = {
  createMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMerchantMutationVariables = {
  input: UpdateMerchantInput,
  condition?: ModelMerchantConditionInput | null,
};

export type UpdateMerchantMutation = {
  updateMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMerchantMutationVariables = {
  input: DeleteMerchantInput,
  condition?: ModelMerchantConditionInput | null,
};

export type DeleteMerchantMutation = {
  deleteMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTransactionsMutationVariables = {
  input: CreateTransactionsInput,
  condition?: ModelTransactionsConditionInput | null,
};

export type CreateTransactionsMutation = {
  createTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTransactionsMutationVariables = {
  input: UpdateTransactionsInput,
  condition?: ModelTransactionsConditionInput | null,
};

export type UpdateTransactionsMutation = {
  updateTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTransactionsMutationVariables = {
  input: DeleteTransactionsInput,
  condition?: ModelTransactionsConditionInput | null,
};

export type DeleteTransactionsMutation = {
  deleteTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetExpenseQueryVariables = {
  id: string,
};

export type GetExpenseQuery = {
  getExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListExpensesQueryVariables = {
  filter?: ModelExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExpensesQuery = {
  listExpenses?:  {
    __typename: "ModelExpenseConnection",
    items:  Array< {
      __typename: "Expense",
      id: string,
      amount?: number | null,
      description?: string | null,
      author_id: string,
      expensegroupID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ExpensesByExpensegroupIDQueryVariables = {
  expensegroupID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ExpensesByExpensegroupIDQuery = {
  expensesByExpensegroupID?:  {
    __typename: "ModelExpenseConnection",
    items:  Array< {
      __typename: "Expense",
      id: string,
      amount?: number | null,
      description?: string | null,
      author_id: string,
      expensegroupID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCalendarQueryVariables = {
  id: string,
};

export type GetCalendarQuery = {
  getCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCalendarsQueryVariables = {
  filter?: ModelCalendarFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCalendarsQuery = {
  listCalendars?:  {
    __typename: "ModelCalendarConnection",
    items:  Array< {
      __typename: "Calendar",
      id: string,
      date?: string | null,
      type?: IncomeOrExpense | null,
      author_id: string,
      amount: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetExpenseGroupQueryVariables = {
  id: string,
};

export type GetExpenseGroupQuery = {
  getExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListExpenseGroupsQueryVariables = {
  filter?: ModelExpenseGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExpenseGroupsQuery = {
  listExpenseGroups?:  {
    __typename: "ModelExpenseGroupConnection",
    items:  Array< {
      __typename: "ExpenseGroup",
      id: string,
      name: string,
      author_id: string,
      color?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetIncomeQueryVariables = {
  id: string,
};

export type GetIncomeQuery = {
  getIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListIncomesQueryVariables = {
  filter?: ModelIncomeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIncomesQuery = {
  listIncomes?:  {
    __typename: "ModelIncomeConnection",
    items:  Array< {
      __typename: "Income",
      id: string,
      amount: number,
      name: string,
      author_id: string,
      icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
      recurrence: IncomeRecurrence,
      start_date: string,
      end_date?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMerchantQueryVariables = {
  id: string,
};

export type GetMerchantQuery = {
  getMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMerchantsQueryVariables = {
  filter?: ModelMerchantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMerchantsQuery = {
  listMerchants?:  {
    __typename: "ModelMerchantConnection",
    items:  Array< {
      __typename: "Merchant",
      id: string,
      merchant_name: string,
      author_id: string,
      image?: string | null,
      category_id?: string | null,
      keywords?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTransactionsQueryVariables = {
  id: string,
};

export type GetTransactionsQuery = {
  getTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionsConnection",
    items:  Array< {
      __typename: "Transactions",
      id: string,
      post_date?: string | null,
      transaction_date: string,
      amount: number,
      description: string,
      created_at?: string | null,
      author_id: string,
      category_id?: string | null,
      transaction_type: TransactionType,
      merchantID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TransactionsByMerchantIDQueryVariables = {
  merchantID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTransactionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TransactionsByMerchantIDQuery = {
  transactionsByMerchantID?:  {
    __typename: "ModelTransactionsConnection",
    items:  Array< {
      __typename: "Transactions",
      id: string,
      post_date?: string | null,
      transaction_date: string,
      amount: number,
      description: string,
      created_at?: string | null,
      author_id: string,
      category_id?: string | null,
      transaction_type: TransactionType,
      merchantID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
};

export type OnCreateExpenseSubscription = {
  onCreateExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
};

export type OnUpdateExpenseSubscription = {
  onUpdateExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
};

export type OnDeleteExpenseSubscription = {
  onDeleteExpense?:  {
    __typename: "Expense",
    id: string,
    amount?: number | null,
    description?: string | null,
    author_id: string,
    expensegroupID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionCalendarFilterInput | null,
};

export type OnCreateCalendarSubscription = {
  onCreateCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionCalendarFilterInput | null,
};

export type OnUpdateCalendarSubscription = {
  onUpdateCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCalendarSubscriptionVariables = {
  filter?: ModelSubscriptionCalendarFilterInput | null,
};

export type OnDeleteCalendarSubscription = {
  onDeleteCalendar?:  {
    __typename: "Calendar",
    id: string,
    date?: string | null,
    type?: IncomeOrExpense | null,
    author_id: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateExpenseGroupSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseGroupFilterInput | null,
};

export type OnCreateExpenseGroupSubscription = {
  onCreateExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateExpenseGroupSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseGroupFilterInput | null,
};

export type OnUpdateExpenseGroupSubscription = {
  onUpdateExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteExpenseGroupSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseGroupFilterInput | null,
};

export type OnDeleteExpenseGroupSubscription = {
  onDeleteExpenseGroup?:  {
    __typename: "ExpenseGroup",
    id: string,
    name: string,
    author_id: string,
    color?: string | null,
    Expenses?:  {
      __typename: "ModelExpenseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateIncomeSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeFilterInput | null,
};

export type OnCreateIncomeSubscription = {
  onCreateIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateIncomeSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeFilterInput | null,
};

export type OnUpdateIncomeSubscription = {
  onUpdateIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteIncomeSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeFilterInput | null,
};

export type OnDeleteIncomeSubscription = {
  onDeleteIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    name: string,
    author_id: string,
    icon?:  {
      __typename: "Icon",
      Icon_name?: string | null,
      Icon_type?: string | null,
    } | null,
    recurrence: IncomeRecurrence,
    start_date: string,
    end_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMerchantSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantFilterInput | null,
};

export type OnCreateMerchantSubscription = {
  onCreateMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMerchantSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantFilterInput | null,
};

export type OnUpdateMerchantSubscription = {
  onUpdateMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMerchantSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantFilterInput | null,
};

export type OnDeleteMerchantSubscription = {
  onDeleteMerchant?:  {
    __typename: "Merchant",
    id: string,
    merchant_name: string,
    author_id: string,
    image?: string | null,
    category_id?: string | null,
    keywords?: Array< string | null > | null,
    Transactions?:  {
      __typename: "ModelTransactionsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTransactionsSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionsFilterInput | null,
};

export type OnCreateTransactionsSubscription = {
  onCreateTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransactionsSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionsFilterInput | null,
};

export type OnUpdateTransactionsSubscription = {
  onUpdateTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransactionsSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionsFilterInput | null,
};

export type OnDeleteTransactionsSubscription = {
  onDeleteTransactions?:  {
    __typename: "Transactions",
    id: string,
    post_date?: string | null,
    transaction_date: string,
    amount: number,
    description: string,
    created_at?: string | null,
    author_id: string,
    category_id?: string | null,
    transaction_type: TransactionType,
    merchantID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
