import { createStore } from "effector";

import { TransactionState } from "./TransactionState";
import { loadCreateTransactionDone, loadTransaction, loadTransactionBuscadasDone, loadTransactionDone, loadTransactionFail } from "./TransactionEvents";


const initialState: TransactionState = {
  isLoading: false,
  transactions: [],
  transactionsSearch: [],
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
    transactionsSearch: [],
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
    transactionsSearch: data,
    hasError: false,
    errorMessage: ""
  }));

export default TransactionStore;