/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCalendar = /* GraphQL */ `query GetCalendar($id: ID!) {
  getCalendar(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCalendarQueryVariables,
  APITypes.GetCalendarQuery
>;
export const listCalendars = /* GraphQL */ `query ListCalendars(
  $filter: ModelCalendarFilterInput
  $limit: Int
  $nextToken: String
) {
  listCalendars(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      type
      author_id
      amount
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCalendarsQueryVariables,
  APITypes.ListCalendarsQuery
>;
export const getExpense = /* GraphQL */ `query GetExpense($id: ID!) {
  getExpense(id: $id) {
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
      author_id
      color
      createdAt
      updatedAt
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
export const getIncome = /* GraphQL */ `query GetIncome($id: ID!) {
  getIncome(id: $id) {
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
` as GeneratedQuery<APITypes.GetIncomeQueryVariables, APITypes.GetIncomeQuery>;
export const listIncomes = /* GraphQL */ `query ListIncomes(
  $filter: ModelIncomeFilterInput
  $limit: Int
  $nextToken: String
) {
  listIncomes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      amount
      name
      author_id
      recurrence
      start_date
      end_date
      createdAt
      updatedAt
      __typename
      icon {
      Icon_name
      Icon_type
      __typename
    }
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIncomesQueryVariables,
  APITypes.ListIncomesQuery
>;
export const getMerchant = /* GraphQL */ `query GetMerchant($id: ID!) {
  getMerchant(id: $id) {
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
      merchant_name
      authour_id
      image
      category_id
      keywords
      expenseID
      createdAt
      updatedAt
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
export const merchantsByExpenseID = /* GraphQL */ `query MerchantsByExpenseID(
  $expenseID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMerchantFilterInput
  $limit: Int
  $nextToken: String
) {
  merchantsByExpenseID(
    expenseID: $expenseID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      merchant_name
      authour_id
      image
      category_id
      keywords
      expenseID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MerchantsByExpenseIDQueryVariables,
  APITypes.MerchantsByExpenseIDQuery
>;
export const getTransactions = /* GraphQL */ `query GetTransactions($id: ID!) {
  getTransactions(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTransactionsQueryVariables,
  APITypes.GetTransactionsQuery
>;
export const listTransactions = /* GraphQL */ `query ListTransactions(
  $filter: ModelTransactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransactionsQueryVariables,
  APITypes.ListTransactionsQuery
>;
export const transactionsByMerchantID = /* GraphQL */ `query TransactionsByMerchantID(
  $merchantID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTransactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  transactionsByMerchantID(
    merchantID: $merchantID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TransactionsByMerchantIDQueryVariables,
  APITypes.TransactionsByMerchantIDQuery
>;
