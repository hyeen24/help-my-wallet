/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMerchantTransaction = /* GraphQL */ `subscription OnCreateMerchantTransaction(
  $filter: ModelSubscriptionMerchantTransactionFilterInput
  $owner: String
) {
  onCreateMerchantTransaction(filter: $filter, owner: $owner) {
    id
    merchant_id
    transaction_id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMerchantTransactionSubscriptionVariables,
  APITypes.OnCreateMerchantTransactionSubscription
>;
export const onUpdateMerchantTransaction = /* GraphQL */ `subscription OnUpdateMerchantTransaction(
  $filter: ModelSubscriptionMerchantTransactionFilterInput
  $owner: String
) {
  onUpdateMerchantTransaction(filter: $filter, owner: $owner) {
    id
    merchant_id
    transaction_id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMerchantTransactionSubscriptionVariables,
  APITypes.OnUpdateMerchantTransactionSubscription
>;
export const onDeleteMerchantTransaction = /* GraphQL */ `subscription OnDeleteMerchantTransaction(
  $filter: ModelSubscriptionMerchantTransactionFilterInput
  $owner: String
) {
  onDeleteMerchantTransaction(filter: $filter, owner: $owner) {
    id
    merchant_id
    transaction_id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMerchantTransactionSubscriptionVariables,
  APITypes.OnDeleteMerchantTransactionSubscription
>;
export const onCreateReccurrence = /* GraphQL */ `subscription OnCreateReccurrence(
  $filter: ModelSubscriptionReccurrenceFilterInput
) {
  onCreateReccurrence(filter: $filter) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateReccurrenceSubscriptionVariables,
  APITypes.OnCreateReccurrenceSubscription
>;
export const onUpdateReccurrence = /* GraphQL */ `subscription OnUpdateReccurrence(
  $filter: ModelSubscriptionReccurrenceFilterInput
) {
  onUpdateReccurrence(filter: $filter) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateReccurrenceSubscriptionVariables,
  APITypes.OnUpdateReccurrenceSubscription
>;
export const onDeleteReccurrence = /* GraphQL */ `subscription OnDeleteReccurrence(
  $filter: ModelSubscriptionReccurrenceFilterInput
) {
  onDeleteReccurrence(filter: $filter) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteReccurrenceSubscriptionVariables,
  APITypes.OnDeleteReccurrenceSubscription
>;
export const onCreateMerchant = /* GraphQL */ `subscription OnCreateMerchant(
  $filter: ModelSubscriptionMerchantFilterInput
  $owner: String
) {
  onCreateMerchant(filter: $filter, owner: $owner) {
    id
    name
    image
    expense_id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMerchantSubscriptionVariables,
  APITypes.OnCreateMerchantSubscription
>;
export const onUpdateMerchant = /* GraphQL */ `subscription OnUpdateMerchant(
  $filter: ModelSubscriptionMerchantFilterInput
  $owner: String
) {
  onUpdateMerchant(filter: $filter, owner: $owner) {
    id
    name
    image
    expense_id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMerchantSubscriptionVariables,
  APITypes.OnUpdateMerchantSubscription
>;
export const onDeleteMerchant = /* GraphQL */ `subscription OnDeleteMerchant(
  $filter: ModelSubscriptionMerchantFilterInput
  $owner: String
) {
  onDeleteMerchant(filter: $filter, owner: $owner) {
    id
    name
    image
    expense_id
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMerchantSubscriptionVariables,
  APITypes.OnDeleteMerchantSubscription
>;
export const onCreateIncome = /* GraphQL */ `subscription OnCreateIncome(
  $filter: ModelSubscriptionIncomeFilterInput
  $owner: String
) {
  onCreateIncome(filter: $filter, owner: $owner) {
    id
    name
    recurrence_id
    start_date
    active
    amount
    icon {
      icon_name
      icon_type
      __typename
    }
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateIncomeSubscriptionVariables,
  APITypes.OnCreateIncomeSubscription
>;
export const onUpdateIncome = /* GraphQL */ `subscription OnUpdateIncome(
  $filter: ModelSubscriptionIncomeFilterInput
  $owner: String
) {
  onUpdateIncome(filter: $filter, owner: $owner) {
    id
    name
    recurrence_id
    start_date
    active
    amount
    icon {
      icon_name
      icon_type
      __typename
    }
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateIncomeSubscriptionVariables,
  APITypes.OnUpdateIncomeSubscription
>;
export const onDeleteIncome = /* GraphQL */ `subscription OnDeleteIncome(
  $filter: ModelSubscriptionIncomeFilterInput
  $owner: String
) {
  onDeleteIncome(filter: $filter, owner: $owner) {
    id
    name
    recurrence_id
    start_date
    active
    amount
    icon {
      icon_name
      icon_type
      __typename
    }
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteIncomeSubscriptionVariables,
  APITypes.OnDeleteIncomeSubscription
>;
export const onCreateExpense = /* GraphQL */ `subscription OnCreateExpense(
  $filter: ModelSubscriptionExpenseFilterInput
  $owner: String
) {
  onCreateExpense(filter: $filter, owner: $owner) {
    id
    name
    color
    recurrence_id
    amount
    description
    start_date
    active
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExpenseSubscriptionVariables,
  APITypes.OnCreateExpenseSubscription
>;
export const onUpdateExpense = /* GraphQL */ `subscription OnUpdateExpense(
  $filter: ModelSubscriptionExpenseFilterInput
  $owner: String
) {
  onUpdateExpense(filter: $filter, owner: $owner) {
    id
    name
    color
    recurrence_id
    amount
    description
    start_date
    active
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateExpenseSubscriptionVariables,
  APITypes.OnUpdateExpenseSubscription
>;
export const onDeleteExpense = /* GraphQL */ `subscription OnDeleteExpense(
  $filter: ModelSubscriptionExpenseFilterInput
  $owner: String
) {
  onDeleteExpense(filter: $filter, owner: $owner) {
    id
    name
    color
    recurrence_id
    amount
    description
    start_date
    active
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseSubscriptionVariables,
  APITypes.OnDeleteExpenseSubscription
>;
export const onCreateTransaction = /* GraphQL */ `subscription OnCreateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onCreateTransaction(filter: $filter, owner: $owner) {
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
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTransactionSubscriptionVariables,
  APITypes.OnCreateTransactionSubscription
>;
export const onUpdateTransaction = /* GraphQL */ `subscription OnUpdateTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onUpdateTransaction(filter: $filter, owner: $owner) {
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
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionSubscriptionVariables,
  APITypes.OnUpdateTransactionSubscription
>;
export const onDeleteTransaction = /* GraphQL */ `subscription OnDeleteTransaction(
  $filter: ModelSubscriptionTransactionFilterInput
  $owner: String
) {
  onDeleteTransaction(filter: $filter, owner: $owner) {
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
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionSubscriptionVariables,
  APITypes.OnDeleteTransactionSubscription
>;
