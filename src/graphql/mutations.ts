/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createReccurrence = /* GraphQL */ `mutation CreateReccurrence(
  $input: CreateReccurrenceInput!
  $condition: ModelReccurrenceConditionInput
) {
  createReccurrence(input: $input, condition: $condition) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReccurrenceMutationVariables,
  APITypes.CreateReccurrenceMutation
>;
export const updateReccurrence = /* GraphQL */ `mutation UpdateReccurrence(
  $input: UpdateReccurrenceInput!
  $condition: ModelReccurrenceConditionInput
) {
  updateReccurrence(input: $input, condition: $condition) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReccurrenceMutationVariables,
  APITypes.UpdateReccurrenceMutation
>;
export const deleteReccurrence = /* GraphQL */ `mutation DeleteReccurrence(
  $input: DeleteReccurrenceInput!
  $condition: ModelReccurrenceConditionInput
) {
  deleteReccurrence(input: $input, condition: $condition) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReccurrenceMutationVariables,
  APITypes.DeleteReccurrenceMutation
>;
export const createMerchant = /* GraphQL */ `mutation CreateMerchant(
  $input: CreateMerchantInput!
  $condition: ModelMerchantConditionInput
) {
  createMerchant(input: $input, condition: $condition) {
    id
    name
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMerchantMutationVariables,
  APITypes.CreateMerchantMutation
>;
export const updateMerchant = /* GraphQL */ `mutation UpdateMerchant(
  $input: UpdateMerchantInput!
  $condition: ModelMerchantConditionInput
) {
  updateMerchant(input: $input, condition: $condition) {
    id
    name
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMerchantMutationVariables,
  APITypes.UpdateMerchantMutation
>;
export const deleteMerchant = /* GraphQL */ `mutation DeleteMerchant(
  $input: DeleteMerchantInput!
  $condition: ModelMerchantConditionInput
) {
  deleteMerchant(input: $input, condition: $condition) {
    id
    name
    image
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMerchantMutationVariables,
  APITypes.DeleteMerchantMutation
>;
export const createIncome = /* GraphQL */ `mutation CreateIncome(
  $input: CreateIncomeInput!
  $condition: ModelIncomeConditionInput
) {
  createIncome(input: $input, condition: $condition) {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateIncomeMutationVariables,
  APITypes.CreateIncomeMutation
>;
export const updateIncome = /* GraphQL */ `mutation UpdateIncome(
  $input: UpdateIncomeInput!
  $condition: ModelIncomeConditionInput
) {
  updateIncome(input: $input, condition: $condition) {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateIncomeMutationVariables,
  APITypes.UpdateIncomeMutation
>;
export const deleteIncome = /* GraphQL */ `mutation DeleteIncome(
  $input: DeleteIncomeInput!
  $condition: ModelIncomeConditionInput
) {
  deleteIncome(input: $input, condition: $condition) {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteIncomeMutationVariables,
  APITypes.DeleteIncomeMutation
>;
export const createExpense = /* GraphQL */ `mutation CreateExpense(
  $input: CreateExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  createExpense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateExpenseMutationVariables,
  APITypes.CreateExpenseMutation
>;
export const updateExpense = /* GraphQL */ `mutation UpdateExpense(
  $input: UpdateExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  updateExpense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateExpenseMutationVariables,
  APITypes.UpdateExpenseMutation
>;
export const deleteExpense = /* GraphQL */ `mutation DeleteExpense(
  $input: DeleteExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  deleteExpense(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteExpenseMutationVariables,
  APITypes.DeleteExpenseMutation
>;
export const createTransaction = /* GraphQL */ `mutation CreateTransaction(
  $input: CreateTransactionInput!
  $condition: ModelTransactionConditionInput
) {
  createTransaction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTransactionMutationVariables,
  APITypes.CreateTransactionMutation
>;
export const updateTransaction = /* GraphQL */ `mutation UpdateTransaction(
  $input: UpdateTransactionInput!
  $condition: ModelTransactionConditionInput
) {
  updateTransaction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTransactionMutationVariables,
  APITypes.UpdateTransactionMutation
>;
export const deleteTransaction = /* GraphQL */ `mutation DeleteTransaction(
  $input: DeleteTransactionInput!
  $condition: ModelTransactionConditionInput
) {
  deleteTransaction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTransactionMutationVariables,
  APITypes.DeleteTransactionMutation
>;
