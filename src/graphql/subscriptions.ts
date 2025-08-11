/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCalendar = /* GraphQL */ `subscription OnCreateCalendar($filter: ModelSubscriptionCalendarFilterInput) {
  onCreateCalendar(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCalendarSubscriptionVariables,
  APITypes.OnCreateCalendarSubscription
>;
export const onUpdateCalendar = /* GraphQL */ `subscription OnUpdateCalendar($filter: ModelSubscriptionCalendarFilterInput) {
  onUpdateCalendar(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCalendarSubscriptionVariables,
  APITypes.OnUpdateCalendarSubscription
>;
export const onDeleteCalendar = /* GraphQL */ `subscription OnDeleteCalendar($filter: ModelSubscriptionCalendarFilterInput) {
  onDeleteCalendar(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCalendarSubscriptionVariables,
  APITypes.OnDeleteCalendarSubscription
>;
export const onCreateExpense = /* GraphQL */ `subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onCreateExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateExpenseSubscriptionVariables,
  APITypes.OnCreateExpenseSubscription
>;
export const onUpdateExpense = /* GraphQL */ `subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onUpdateExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateExpenseSubscriptionVariables,
  APITypes.OnUpdateExpenseSubscription
>;
export const onDeleteExpense = /* GraphQL */ `subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onDeleteExpense(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseSubscriptionVariables,
  APITypes.OnDeleteExpenseSubscription
>;
export const onCreateIncome = /* GraphQL */ `subscription OnCreateIncome($filter: ModelSubscriptionIncomeFilterInput) {
  onCreateIncome(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateIncomeSubscriptionVariables,
  APITypes.OnCreateIncomeSubscription
>;
export const onUpdateIncome = /* GraphQL */ `subscription OnUpdateIncome($filter: ModelSubscriptionIncomeFilterInput) {
  onUpdateIncome(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateIncomeSubscriptionVariables,
  APITypes.OnUpdateIncomeSubscription
>;
export const onDeleteIncome = /* GraphQL */ `subscription OnDeleteIncome($filter: ModelSubscriptionIncomeFilterInput) {
  onDeleteIncome(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteIncomeSubscriptionVariables,
  APITypes.OnDeleteIncomeSubscription
>;
export const onCreateMerchant = /* GraphQL */ `subscription OnCreateMerchant($filter: ModelSubscriptionMerchantFilterInput) {
  onCreateMerchant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMerchantSubscriptionVariables,
  APITypes.OnCreateMerchantSubscription
>;
export const onUpdateMerchant = /* GraphQL */ `subscription OnUpdateMerchant($filter: ModelSubscriptionMerchantFilterInput) {
  onUpdateMerchant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMerchantSubscriptionVariables,
  APITypes.OnUpdateMerchantSubscription
>;
export const onDeleteMerchant = /* GraphQL */ `subscription OnDeleteMerchant($filter: ModelSubscriptionMerchantFilterInput) {
  onDeleteMerchant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMerchantSubscriptionVariables,
  APITypes.OnDeleteMerchantSubscription
>;
export const onCreateTransactions = /* GraphQL */ `subscription OnCreateTransactions(
  $filter: ModelSubscriptionTransactionsFilterInput
) {
  onCreateTransactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTransactionsSubscriptionVariables,
  APITypes.OnCreateTransactionsSubscription
>;
export const onUpdateTransactions = /* GraphQL */ `subscription OnUpdateTransactions(
  $filter: ModelSubscriptionTransactionsFilterInput
) {
  onUpdateTransactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTransactionsSubscriptionVariables,
  APITypes.OnUpdateTransactionsSubscription
>;
export const onDeleteTransactions = /* GraphQL */ `subscription OnDeleteTransactions(
  $filter: ModelSubscriptionTransactionsFilterInput
) {
  onDeleteTransactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTransactionsSubscriptionVariables,
  APITypes.OnDeleteTransactionsSubscription
>;
