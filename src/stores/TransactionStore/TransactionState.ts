import { TransactionValues } from "../../domain/transaction";

export interface TransactionState {
    isLoading: boolean;
    transactions: TransactionValues[];
    transactionsBuscadas: TransactionValues[],
    hasError: boolean;
    errorMessage: string;
  }