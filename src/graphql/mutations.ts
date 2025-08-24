/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCalendar = /* GraphQL */ `mutation CreateCalendar(
  $input: CreateCalendarInput!
  $condition: ModelCalendarConditionInput
) {
  createCalendar(input: $input, condition: $condition) {
    id
    date
    type
    author_id
    amount
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCalendarMutationVariables,
  APITypes.CreateCalendarMutation
>;
export const updateCalendar = /* GraphQL */ `mutation UpdateCalendar(
  $input: UpdateCalendarInput!
  $condition: ModelCalendarConditionInput
) {
  updateCalendar(input: $input, condition: $condition) {
    id
    date
    type
    author_id
    amount
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCalendarMutationVariables,
  APITypes.UpdateCalendarMutation
>;
export const deleteCalendar = /* GraphQL */ `mutation DeleteCalendar(
  $input: DeleteCalendarInput!
  $condition: ModelCalendarConditionInput
) {
  deleteCalendar(input: $input, condition: $condition) {
    id
    date
    type
    author_id
    amount
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCalendarMutationVariables,
  APITypes.DeleteCalendarMutation
>;
export const createExpense = /* GraphQL */ `mutation CreateExpense(
  $input: CreateExpenseInput!
  $condition: ModelExpenseConditionInput
) {
  createExpense(input: $input, condition: $condition) {
    id
    name
    author_id
    color
    Merchants {
      nextToken
      __typename
    }
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
    amount
    author_id
    color
    Merchants {
      nextToken
      __typename
    }
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
    amount
    author_id
    color
    Merchants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteExpenseMutationVariables,
  APITypes.DeleteExpenseMutation
>;
export const createIncome = /* GraphQL */ `mutation CreateIncome(
  $input: CreateIncomeInput!
  $condition: ModelIncomeConditionInput
) {
  createIncome(input: $input, condition: $condition) {
    id
    amount
    name
    author_id
    icon {
      Icon_name
      Icon_type
      __typename
    }
    recurrence
    start_date
    end_date
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
    amount
    name
    author_id
    icon {
      Icon_name
      Icon_type
      __typename
    }
    recurrence
    start_date
    end_date
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
    amount
    name
    author_id
    icon {
      Icon_name
      Icon_type
      __typename
    }
    recurrence
    start_date
    end_date
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteIncomeMutationVariables,
  APITypes.DeleteIncomeMutation
>;
export const createMerchant = /* GraphQL */ `mutation CreateMerchant(
  $input: CreateMerchantInput!
  $condition: ModelMerchantConditionInput
) {
  createMerchant(input: $input, condition: $condition) {
    id
    merchant_name
    authour_id
    image
    category_id
    keywords
    Transactions {
      nextToken
      __typename
    }
    expenseID
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
    merchant_name
    authour_id
    image
    category_id
    keywords
    Transactions {
      nextToken
      __typename
    }
    expenseID
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
    merchant_name
    authour_id
    image
    category_id
    keywords
    Transactions {
      nextToken
      __typename
    }
    expenseID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMerchantMutationVariables,
  APITypes.DeleteMerchantMutation
>;
export const createTransactions = /* GraphQL */ `mutation CreateTransactions(
  $input: CreateTransactionsInput!
  $condition: ModelTransactionsConditionInput
) {
  createTransactions(input: $input, condition: $condition) {
    id
    post_date
    transaction_date
    amount
    description
    created_at
    author_id
    category_id
    transaction_type
    merchantID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTransactionsMutationVariables,
  APITypes.CreateTransactionsMutation
>;
export const updateTransactions = /* GraphQL */ `mutation UpdateTransactions(
  $input: UpdateTransactionsInput!
  $condition: ModelTransactionsConditionInput
) {
  updateTransactions(input: $input, condition: $condition) {
    id
    post_date
    transaction_date
    amount
    description
    created_at
    author_id
    category_id
    transaction_type
    merchantID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTransactionsMutationVariables,
  APITypes.UpdateTransactionsMutation
>;
export const deleteTransactions = /* GraphQL */ `mutation DeleteTransactions(
  $input: DeleteTransactionsInput!
  $condition: ModelTransactionsConditionInput
) {
  deleteTransactions(input: $input, condition: $condition) {
    id
    post_date
    transaction_date
    amount
    description
    created_at
    author_id
    category_id
    transaction_type
    merchantID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTransactionsMutationVariables,
  APITypes.DeleteTransactionsMutation
>;
