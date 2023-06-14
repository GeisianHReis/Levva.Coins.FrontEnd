import { AxiosError } from "axios";
import Api from "../../clients/api/Api"
import { RequestError } from "../../domain/request";
import { NewTransactionParams, TransactionValues } from "../../domain/transaction";


export const createTransaction = async ({
    descricao,
    valor,
    tipo,
    categoriaId,
    usuarioId
}: NewTransactionParams): Promise<void> => {
    return Api.post({
        url: "/Transacao",
        body: {
            descricao,
            valor,
            tipo,
            categoriaId,
            usuarioId
        },
    }).then((respose) => {
        return respose.data;
    }).catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

const getTransactions = async(): Promise<TransactionValues[]> => {
    return Api.get({
        url: "/Transacao/all"
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