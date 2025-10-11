/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMerchantTransactionInput = {
  id?: string | null,
  merchant_id: string,
  transaction_id: string,
};

export type ModelMerchantTransactionConditionInput = {
  merchant_id?: ModelStringInput | null,
  transaction_id?: ModelStringInput | null,
  and?: Array< ModelMerchantTransactionConditionInput | null > | null,
  or?: Array< ModelMerchantTransactionConditionInput | null > | null,
  not?: ModelMerchantTransactionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

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


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type MerchantTransaction = {
  __typename: "MerchantTransaction",
  id: string,
  merchant_id: string,
  transaction_id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMerchantTransactionInput = {
  id: string,
  merchant_id?: string | null,
  transaction_id?: string | null,
};

export type DeleteMerchantTransactionInput = {
  id: string,
};

export type CreateReccurrenceInput = {
  id?: string | null,
  type?: RecurrenceType | null,
  value?: string | null,
};

export enum RecurrenceType {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}


export type ModelReccurrenceConditionInput = {
  type?: ModelRecurrenceTypeInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelReccurrenceConditionInput | null > | null,
  or?: Array< ModelReccurrenceConditionInput | null > | null,
  not?: ModelReccurrenceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelRecurrenceTypeInput = {
  eq?: RecurrenceType | null,
  ne?: RecurrenceType | null,
};

export type Reccurrence = {
  __typename: "Reccurrence",
  id: string,
  type?: RecurrenceType | null,
  value?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateReccurrenceInput = {
  id: string,
  type?: RecurrenceType | null,
  value?: string | null,
};

export type DeleteReccurrenceInput = {
  id: string,
};

export type CreateMerchantInput = {
  id?: string | null,
  name: string,
  image?: string | null,
  expense_id?: string | null,
};

export type ModelMerchantConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  expense_id?: ModelStringInput | null,
  and?: Array< ModelMerchantConditionInput | null > | null,
  or?: Array< ModelMerchantConditionInput | null > | null,
  not?: ModelMerchantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type Merchant = {
  __typename: "Merchant",
  id: string,
  name: string,
  image?: string | null,
  expense_id?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMerchantInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  expense_id?: string | null,
};

export type DeleteMerchantInput = {
  id: string,
};

export type CreateIncomeInput = {
  id?: string | null,
  name: string,
  recurrence_id?: string | null,
  start_date: string,
  active?: boolean | null,
  amount: number,
  icon?: IconInput | null,
  description?: string | null,
};

export type IconInput = {
  icon_name: string,
  icon_type: string,
};

export type ModelIncomeConditionInput = {
  name?: ModelStringInput | null,
  recurrence_id?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelIncomeConditionInput | null > | null,
  or?: Array< ModelIncomeConditionInput | null > | null,
  not?: ModelIncomeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
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

export type Income = {
  __typename: "Income",
  id: string,
  name: string,
  recurrence_id?: string | null,
  start_date: string,
  active?: boolean | null,
  amount: number,
  icon?: Icon | null,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Icon = {
  __typename: "Icon",
  icon_name: string,
  icon_type: string,
};

export type UpdateIncomeInput = {
  id: string,
  name?: string | null,
  recurrence_id?: string | null,
  start_date?: string | null,
  active?: boolean | null,
  amount?: number | null,
  icon?: IconInput | null,
  description?: string | null,
};

export type DeleteIncomeInput = {
  id: string,
};

export type CreateExpenseInput = {
  id?: string | null,
  name: string,
  color: string,
  recurrence_id?: string | null,
  amount: number,
  description?: string | null,
  start_date: string,
  active?: boolean | null,
};

export type ModelExpenseConditionInput = {
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  recurrence_id?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  and?: Array< ModelExpenseConditionInput | null > | null,
  or?: Array< ModelExpenseConditionInput | null > | null,
  not?: ModelExpenseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type Expense = {
  __typename: "Expense",
  id: string,
  name: string,
  color: string,
  recurrence_id?: string | null,
  amount: number,
  description?: string | null,
  start_date: string,
  active?: boolean | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateExpenseInput = {
  id: string,
  name?: string | null,
  color?: string | null,
  recurrence_id?: string | null,
  amount?: number | null,
  description?: string | null,
  start_date?: string | null,
  active?: boolean | null,
};

export type DeleteExpenseInput = {
  id: string,
};

export type CreateTransactionInput = {
  id?: string | null,
  reference_id?: string | null,
  transaction_date: string,
  post_date: string,
  transaction_type: TransactionType,
  amount: number,
  category_id?: string | null,
  description?: string | null,
  title?: string | null,
};

export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}


export type ModelTransactionConditionInput = {
  reference_id?: ModelStringInput | null,
  transaction_date?: ModelStringInput | null,
  post_date?: ModelStringInput | null,
  transaction_type?: ModelTransactionTypeInput | null,
  amount?: ModelFloatInput | null,
  category_id?: ModelStringInput | null,
  description?: ModelStringInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  not?: ModelTransactionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelTransactionTypeInput = {
  eq?: TransactionType | null,
  ne?: TransactionType | null,
};

export type Transaction = {
  __typename: "Transaction",
  id: string,
  reference_id?: string | null,
  transaction_date: string,
  post_date: string,
  transaction_type: TransactionType,
  amount: number,
  category_id?: string | null,
  description?: string | null,
  title?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateTransactionInput = {
  id: string,
  reference_id?: string | null,
  transaction_date?: string | null,
  post_date?: string | null,
  transaction_type?: TransactionType | null,
  amount?: number | null,
  category_id?: string | null,
  description?: string | null,
  title?: string | null,
};

export type DeleteTransactionInput = {
  id: string,
};

export type ModelMerchantTransactionFilterInput = {
  id?: ModelIDInput | null,
  merchant_id?: ModelStringInput | null,
  transaction_id?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMerchantTransactionFilterInput | null > | null,
  or?: Array< ModelMerchantTransactionFilterInput | null > | null,
  not?: ModelMerchantTransactionFilterInput | null,
  owner?: ModelStringInput | null,
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

export type ModelMerchantTransactionConnection = {
  __typename: "ModelMerchantTransactionConnection",
  items:  Array<MerchantTransaction | null >,
  nextToken?: string | null,
};

export type ModelReccurrenceFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelRecurrenceTypeInput | null,
  value?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelReccurrenceFilterInput | null > | null,
  or?: Array< ModelReccurrenceFilterInput | null > | null,
  not?: ModelReccurrenceFilterInput | null,
};

export type ModelReccurrenceConnection = {
  __typename: "ModelReccurrenceConnection",
  items:  Array<Reccurrence | null >,
  nextToken?: string | null,
};

export type ModelMerchantFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  expense_id?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMerchantFilterInput | null > | null,
  or?: Array< ModelMerchantFilterInput | null > | null,
  not?: ModelMerchantFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelMerchantConnection = {
  __typename: "ModelMerchantConnection",
  items:  Array<Merchant | null >,
  nextToken?: string | null,
};

export type ModelIncomeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  recurrence_id?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelIncomeFilterInput | null > | null,
  or?: Array< ModelIncomeFilterInput | null > | null,
  not?: ModelIncomeFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIncomeConnection = {
  __typename: "ModelIncomeConnection",
  items:  Array<Income | null >,
  nextToken?: string | null,
};

export type ModelExpenseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  recurrence_id?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelExpenseFilterInput | null > | null,
  or?: Array< ModelExpenseFilterInput | null > | null,
  not?: ModelExpenseFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelExpenseConnection = {
  __typename: "ModelExpenseConnection",
  items:  Array<Expense | null >,
  nextToken?: string | null,
};

export type ModelTransactionFilterInput = {
  id?: ModelIDInput | null,
  reference_id?: ModelStringInput | null,
  transaction_date?: ModelStringInput | null,
  post_date?: ModelStringInput | null,
  transaction_type?: ModelTransactionTypeInput | null,
  amount?: ModelFloatInput | null,
  category_id?: ModelStringInput | null,
  description?: ModelStringInput | null,
  title?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelTransactionConnection = {
  __typename: "ModelTransactionConnection",
  items:  Array<Transaction | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionMerchantTransactionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  merchant_id?: ModelSubscriptionStringInput | null,
  transaction_id?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMerchantTransactionFilterInput | null > | null,
  or?: Array< ModelSubscriptionMerchantTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
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

export type ModelSubscriptionReccurrenceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReccurrenceFilterInput | null > | null,
  or?: Array< ModelSubscriptionReccurrenceFilterInput | null > | null,
};

export type ModelSubscriptionMerchantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  expense_id?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMerchantFilterInput | null > | null,
  or?: Array< ModelSubscriptionMerchantFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIncomeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  recurrence_id?: ModelSubscriptionStringInput | null,
  start_date?: ModelSubscriptionStringInput | null,
  active?: ModelSubscriptionBooleanInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionIncomeFilterInput | null > | null,
  or?: Array< ModelSubscriptionIncomeFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
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

export type ModelSubscriptionExpenseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  color?: ModelSubscriptionStringInput | null,
  recurrence_id?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  description?: ModelSubscriptionStringInput | null,
  start_date?: ModelSubscriptionStringInput | null,
  active?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExpenseFilterInput | null > | null,
  or?: Array< ModelSubscriptionExpenseFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionTransactionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  reference_id?: ModelSubscriptionStringInput | null,
  transaction_date?: ModelSubscriptionStringInput | null,
  post_date?: ModelSubscriptionStringInput | null,
  transaction_type?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  category_id?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  or?: Array< ModelSubscriptionTransactionFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateMerchantTransactionMutationVariables = {
  input: CreateMerchantTransactionInput,
  condition?: ModelMerchantTransactionConditionInput | null,
};

export type CreateMerchantTransactionMutation = {
  createMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateMerchantTransactionMutationVariables = {
  input: UpdateMerchantTransactionInput,
  condition?: ModelMerchantTransactionConditionInput | null,
};

export type UpdateMerchantTransactionMutation = {
  updateMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteMerchantTransactionMutationVariables = {
  input: DeleteMerchantTransactionInput,
  condition?: ModelMerchantTransactionConditionInput | null,
};

export type DeleteMerchantTransactionMutation = {
  deleteMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateReccurrenceMutationVariables = {
  input: CreateReccurrenceInput,
  condition?: ModelReccurrenceConditionInput | null,
};

export type CreateReccurrenceMutation = {
  createReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReccurrenceMutationVariables = {
  input: UpdateReccurrenceInput,
  condition?: ModelReccurrenceConditionInput | null,
};

export type UpdateReccurrenceMutation = {
  updateReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReccurrenceMutationVariables = {
  input: DeleteReccurrenceInput,
  condition?: ModelReccurrenceConditionInput | null,
};

export type DeleteReccurrenceMutation = {
  deleteReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
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
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateExpenseMutationVariables = {
  input: CreateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type CreateExpenseMutation = {
  createExpense?:  {
    __typename: "Expense",
    id: string,
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type CreateTransactionMutation = {
  createTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionMutation = {
  updateTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type DeleteTransactionMutation = {
  deleteTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetMerchantTransactionQueryVariables = {
  id: string,
};

export type GetMerchantTransactionQuery = {
  getMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListMerchantTransactionsQueryVariables = {
  filter?: ModelMerchantTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMerchantTransactionsQuery = {
  listMerchantTransactions?:  {
    __typename: "ModelMerchantTransactionConnection",
    items:  Array< {
      __typename: "MerchantTransaction",
      id: string,
      merchant_id: string,
      transaction_id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReccurrenceQueryVariables = {
  id: string,
};

export type GetReccurrenceQuery = {
  getReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReccurrencesQueryVariables = {
  filter?: ModelReccurrenceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReccurrencesQuery = {
  listReccurrences?:  {
    __typename: "ModelReccurrenceConnection",
    items:  Array< {
      __typename: "Reccurrence",
      id: string,
      type?: RecurrenceType | null,
      value?: string | null,
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
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      name: string,
      image?: string | null,
      expense_id?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      name: string,
      recurrence_id?: string | null,
      start_date: string,
      active?: boolean | null,
      amount: number,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetExpenseQueryVariables = {
  id: string,
};

export type GetExpenseQuery = {
  getExpense?:  {
    __typename: "Expense",
    id: string,
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      name: string,
      color: string,
      recurrence_id?: string | null,
      amount: number,
      description?: string | null,
      start_date: string,
      active?: boolean | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      reference_id?: string | null,
      transaction_date: string,
      post_date: string,
      transaction_type: TransactionType,
      amount: number,
      category_id?: string | null,
      description?: string | null,
      title?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMerchantTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantTransactionFilterInput | null,
  owner?: string | null,
};

export type OnCreateMerchantTransactionSubscription = {
  onCreateMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMerchantTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantTransactionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMerchantTransactionSubscription = {
  onUpdateMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMerchantTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantTransactionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMerchantTransactionSubscription = {
  onDeleteMerchantTransaction?:  {
    __typename: "MerchantTransaction",
    id: string,
    merchant_id: string,
    transaction_id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateReccurrenceSubscriptionVariables = {
  filter?: ModelSubscriptionReccurrenceFilterInput | null,
};

export type OnCreateReccurrenceSubscription = {
  onCreateReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReccurrenceSubscriptionVariables = {
  filter?: ModelSubscriptionReccurrenceFilterInput | null,
};

export type OnUpdateReccurrenceSubscription = {
  onUpdateReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReccurrenceSubscriptionVariables = {
  filter?: ModelSubscriptionReccurrenceFilterInput | null,
};

export type OnDeleteReccurrenceSubscription = {
  onDeleteReccurrence?:  {
    __typename: "Reccurrence",
    id: string,
    type?: RecurrenceType | null,
    value?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMerchantSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantFilterInput | null,
  owner?: string | null,
};

export type OnCreateMerchantSubscription = {
  onCreateMerchant?:  {
    __typename: "Merchant",
    id: string,
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMerchantSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMerchantSubscription = {
  onUpdateMerchant?:  {
    __typename: "Merchant",
    id: string,
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMerchantSubscriptionVariables = {
  filter?: ModelSubscriptionMerchantFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMerchantSubscription = {
  onDeleteMerchant?:  {
    __typename: "Merchant",
    id: string,
    name: string,
    image?: string | null,
    expense_id?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateIncomeSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeFilterInput | null,
  owner?: string | null,
};

export type OnCreateIncomeSubscription = {
  onCreateIncome?:  {
    __typename: "Income",
    id: string,
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateIncomeSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeFilterInput | null,
  owner?: string | null,
};

export type OnUpdateIncomeSubscription = {
  onUpdateIncome?:  {
    __typename: "Income",
    id: string,
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteIncomeSubscriptionVariables = {
  filter?: ModelSubscriptionIncomeFilterInput | null,
  owner?: string | null,
};

export type OnDeleteIncomeSubscription = {
  onDeleteIncome?:  {
    __typename: "Income",
    id: string,
    name: string,
    recurrence_id?: string | null,
    start_date: string,
    active?: boolean | null,
    amount: number,
    icon?:  {
      __typename: "Icon",
      icon_name: string,
      icon_type: string,
    } | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
  owner?: string | null,
};

export type OnCreateExpenseSubscription = {
  onCreateExpense?:  {
    __typename: "Expense",
    id: string,
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
  owner?: string | null,
};

export type OnUpdateExpenseSubscription = {
  onUpdateExpense?:  {
    __typename: "Expense",
    id: string,
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
  owner?: string | null,
};

export type OnDeleteExpenseSubscription = {
  onDeleteExpense?:  {
    __typename: "Expense",
    id: string,
    name: string,
    color: string,
    recurrence_id?: string | null,
    amount: number,
    description?: string | null,
    start_date: string,
    active?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTransactionSubscriptionVariables = {
  filter?: ModelSubscriptionTransactionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction?:  {
    __typename: "Transaction",
    id: string,
    reference_id?: string | null,
    transaction_date: string,
    post_date: string,
    transaction_type: TransactionType,
    amount: number,
    category_id?: string | null,
    description?: string | null,
    title?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
