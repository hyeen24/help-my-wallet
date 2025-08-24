/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateExpense = /* GraphQL */ `subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
  onCreateExpense(filter: $filter) {
    id
    amount
    description
    author_id
    expensegroupID
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
    amount
    description
    author_id
    expensegroupID
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
    amount
    description
    author_id
    expensegroupID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseSubscriptionVariables,
  APITypes.OnDeleteExpenseSubscription
>;
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
export const onCreateExpenseGroup = /* GraphQL */ `subscription OnCreateExpenseGroup(
  $filter: ModelSubscriptionExpenseGroupFilterInput
) {
  onCreateExpenseGroup(filter: $filter) {
    id
    name
    author_id
    color
    Expenses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateExpenseGroupSubscriptionVariables,
  APITypes.OnCreateExpenseGroupSubscription
>;
export const onUpdateExpenseGroup = /* GraphQL */ `subscription OnUpdateExpenseGroup(
  $filter: ModelSubscriptionExpenseGroupFilterInput
) {
  onUpdateExpenseGroup(filter: $filter) {
    id
    name
    author_id
    color
    Expenses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateExpenseGroupSubscriptionVariables,
  APITypes.OnUpdateExpenseGroupSubscription
>;
export const onDeleteExpenseGroup = /* GraphQL */ `subscription OnDeleteExpenseGroup(
  $filter: ModelSubscriptionExpenseGroupFilterInput
) {
  onDeleteExpenseGroup(filter: $filter) {
    id
    name
    author_id
    color
    Expenses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteExpenseGroupSubscriptionVariables,
  APITypes.OnDeleteExpenseGroupSubscription
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
    author_id
    image
    category_id
    keywords
    Transactions {
      nextToken
      __typename
    }
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
    author_id
    image
    category_id
    keywords
    Transactions {
      nextToken
      __typename
    }
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
    author_id
    image
    category_id
    keywords
    Transactions {
      nextToken
      __typename
    }
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
