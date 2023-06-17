import { AxiosError } from "axios";
import Api from "../../clients/api/Api"
import { RequestError } from "../../domain/request";
import { NewAccountParams } from "../../domain/newAccount";

const createUser = async ({
    name,
    email,
    password,
}: NewAccountParams): Promise<void> => {
    return Api.post({
        url: "/User",
        body: {
            name,
            email,
            password,
        },
    }).then((respose) => {
        return respose.date;
    }).catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
    });
};

export const NewAccountService = {
    createUser,
};