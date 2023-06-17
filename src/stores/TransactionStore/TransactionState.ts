import { TransactionValues } from "../../domain/transaction";

export interface TransactionState {
    isLoading: boolean;
    transactions: TransactionValues[];
    transactionsSearch: TransactionValues[],
    hasError: boolean;
    errorMessage: string;
  }