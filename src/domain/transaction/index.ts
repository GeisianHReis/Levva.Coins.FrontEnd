import { CategoryValues } from "../category";

export interface NewTransactionParams {
    description: string;
    amount: number;
    type: number;
    categoryId: string;
    userId: number;
}
export interface TransactionValues {
    id: string;
    description: string;
    amount: number;
    type: number;
    categoryId: string;
    category: CategoryValues;
    date: string;
}
