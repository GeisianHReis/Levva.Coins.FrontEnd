import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { LoginParams, LoginValues } from "../../domain/login";
import { RequestError } from "../../domain/request";

const authenticateUser = async ({
  email,
  senha,
}: LoginParams): Promise<LoginValues> => {
  return Api.post({
    url: "/Usuario/auth",
    body: {
      email,
      senha,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const LoginService = {
  authenticateUser,
};
