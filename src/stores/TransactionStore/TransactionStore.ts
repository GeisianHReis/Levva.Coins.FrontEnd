import { createStore } from "effector";

import { TransactionState } from "./TransactionState";
import { loadCreateTransactionDone, loadTransaction, loadTransactionBuscadasDone, loadTransactionDone, loadTransactionFail } from "./TransactionEvents";


const initialState: TransactionState = {
  isLoading: false,
  transactions: [],
  transactionsBuscadas: [],
  hasError: false,
  errorMessage: "",
  
};

const TransactionStore = createStore<TransactionState>(initialState)
  .on(loadTransaction, (state) => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: ""
  }))
  .on(loadCreateTransactionDone, (state) => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: ""
  }))
  .on(loadTransactionDone, (_, data) => ({
    isLoading: false,
    transactions: data,
    transactionsBuscadas: [],
    hasError: false,
    errorMessage: ""
  }))
  .on(loadTransactionFail, (state, data) => ({
    ...state,
    hasError: data.hasError,
    errorMessage: data.message,
    isLoading: false,
  }))
  .on(loadTransactionBuscadasDone, (state, data) => ({
    ...state,
    isLoading: false,
    transactionsBuscadas: data,
    hasError: false,
    errorMessage: ""
  }));

export default TransactionStore;