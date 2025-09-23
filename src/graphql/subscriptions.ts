/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMerchant = /* GraphQL */ `subscription OnCreateMerchant($filter: ModelSubscriptionMerchantFilterInput) {
  onCreateMerchant(filter: $filter) {
    id
    name
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMerchantSubscriptionVariables,
  APITypes.OnCreateMerchantSubscription
>;
export const onUpdateMerchant = /* GraphQL */ `subscription OnUpdateMerchant($filter: ModelSubscriptionMerchantFilterInput) {
  onUpdateMerchant(filter: $filter) {
    id
    name
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMerchantSubscriptionVariables,
  APITypes.OnUpdateMerchantSubscription
>;
export const onDeleteMerchant = /* GraphQL */ `subscription OnDeleteMerchant($filter: ModelSubscriptionMerchantFilterInput) {
  onDeleteMerchant(filter: $filter) {
    id
    name
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMerchantSubscriptionVariables,
  APITypes.OnDeleteMerchantSubscription
>;
export const onCreateIncome = /* GraphQL */ `subscription OnCreateIncome($filter: ModelSubscriptionIncomeFilterInput) {
  onCreateIncome(filter: $filter) {
    id
    name
    recurrence_id
    start_date
    active
    amount
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateIncomeSubscriptionVariables,
  APITypes.OnCreateIncomeSubscription
>;
export const onUpdateIncome = /* GraphQL */ `subscription OnUpdateIncome($filter: ModelSubscriptionIncomeFilterInput) {
  onUpdateIncome(filter: $filter) {
    id
    name
    recurrence_id
    start_date
    active
    amount
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateIncomeSubscriptionVariables,
  APITypes.OnUpdateIncomeSubscription
>;
export const onDeleteIncome = /* GraphQL */ `subscription OnDeleteIncome($filter: ModelSubscriptionIncomeFilterInput) {
  onDeleteIncome(filter: $filter) {
    id
    name
    recurrence_id
    start_date
    active
    amount
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteIncomeSubscriptionVariables,
  APITypes.OnDeleteIncomeSubscription
>;
export const onCreateExpense = /* GraphQL */ `subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onCreateExpense(filter: $filter) {
    id
    name
    color
    merchant_id
    recurrence_id
    amount
    description
    start_date
    active
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExpenseSubscriptionVariables,
  APITypes.OnCreateExpenseSubscription
>;
export const onUpdateExpense = /* GraphQL */ `subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onUpdateExpense(filter: $filter) {
    id
    name
    color
    merchant_id
    recurrence_id
    amount
    description
    start_date
    active
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateExpenseSubscriptionVariables,
  APITypes.OnUpdateExpenseSubscription
>;
export const onDeleteExpense = /* GraphQL */ `subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onDeleteExpense(filter: $filter) {
    id
    name
    color
    merchant_id
    recurrence_id
    amount
    description
    start_date
    active
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseSubscriptionVariables,
  APITypes.OnDeleteExpenseSubscription
>;
export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
) {
  onCreateTransaction(filter: $filter) {
    id
    reference_id
    transaction_date
    post_date
    transaction_type
    amount
    category_id
    description
    title
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTransactionSubscriptionVariables,
  APITypes.OnCreateTransactionSubscription
>;
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
) {
  onUpdateTransaction(filter: $filter) {
    id
    reference_id
    transaction_date
    post_date
    transaction_type
    amount
    category_id
    description
    title
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionSubscriptionVariables,
  APITypes.OnUpdateTransactionSubscription
>;
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
) {
  onDeleteTransaction(filter: $filter) {
    id
    reference_id
    transaction_date
    post_date
    transaction_type
    amount
    category_id
    description
    title
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionSubscriptionVariables,
  APITypes.OnDeleteTransactionSubscription
>;
