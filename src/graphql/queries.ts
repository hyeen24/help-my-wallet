/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getReccurrence = /* GraphQL */ `query GetReccurrence($id: ID!) {
  getReccurrence(id: $id) {
    id
    type
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetReccurrenceQueryVariables,
  APITypes.GetReccurrenceQuery
>;
export const listReccurrences = /* GraphQL */ `query ListReccurrences(
  $filter: ModelReccurrenceFilterInput
  $limit: Int
  $nextToken: String
) {
  listReccurrences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      value
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReccurrencesQueryVariables,
  APITypes.ListReccurrencesQuery
>;
export const getMerchant = /* GraphQL */ `query GetMerchant($id: ID!) {
  getMerchant(id: $id) {
    id
    name
    image
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMerchantQueryVariables,
  APITypes.GetMerchantQuery
>;
export const listMerchants = /* GraphQL */ `query ListMerchants(
  $filter: ModelMerchantFilterInput
  $limit: Int
  $nextToken: String
) {
  listMerchants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      image
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMerchantsQueryVariables,
  APITypes.ListMerchantsQuery
>;
export const getIncome = /* GraphQL */ `query GetIncome($id: ID!) {
  getIncome(id: $id) {
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
` as GeneratedQuery<APITypes.GetIncomeQueryVariables, APITypes.GetIncomeQuery>;
export const listIncomes = /* GraphQL */ `query ListIncomes(
  $filter: ModelIncomeFilterInput
  $limit: Int
  $nextToken: String
) {
  listIncomes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      recurrence_id
      start_date
      active
      amount
      description
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIncomesQueryVariables,
  APITypes.ListIncomesQuery
>;
export const getExpense = /* GraphQL */ `query GetExpense($id: ID!) {
  getExpense(id: $id) {
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
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExpenseQueryVariables,
  APITypes.GetExpenseQuery
>;
export const listExpenses = /* GraphQL */ `query ListExpenses(
  $filter: ModelExpenseFilterInput
  $limit: Int
  $nextToken: String
) {
  listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExpensesQueryVariables,
  APITypes.ListExpensesQuery
>;
export const getTransaction = /* GraphQL */ `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTransactionQueryVariables,
  APITypes.GetTransactionQuery
>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransactionsQueryVariables,
  APITypes.ListTransactionsQuery
>;
