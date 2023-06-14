import { AxiosError } from "axios";
import Api from "../../clients/api/Api"
import { RequestError } from "../../domain/request";
import { NewAccountParams } from "../../domain/newAccount";

const createUser = async ({
    nome,
    email,
    senha,
}: NewAccountParams): Promise<void> => {
    return Api.post({
        url: "/Usuario",
        body: {
            nome,
            email,
            senha,
        },
    }).then((respose) => {
        return respose.data;
    }).catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

export const NewAccountService = {
    createUser,
};