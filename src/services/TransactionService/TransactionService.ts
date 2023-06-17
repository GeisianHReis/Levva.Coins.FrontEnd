import { AxiosError } from "axios";
import Api from "../../clients/api/Api"
import { RequestError } from "../../domain/request";
import { NewTransactionParams, TransactionValues } from "../../domain/transaction";


export const createTransaction = async ({
    description,
    amount,
    type,
    categoryId,
    userId
}: NewTransactionParams): Promise<void> => {
    return Api.post({
        url: "/Transaction",
        body: {
            description,
            amount,
            type,
            categoryId,
            userId
        },
    }).then((respose) => {
        return respose.data;
    }).catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

const getTransactions = async(): Promise<TransactionValues[]> => {
    return Api.get({
        url: "/Transaction/all"
    }).then((response) => {
        return response.data;
    }).catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

export const TransactionService = {
    getTransactions,
    createTransaction,
     
};