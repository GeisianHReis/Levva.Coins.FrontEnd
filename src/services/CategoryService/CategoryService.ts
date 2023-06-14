import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domain/request";
import { CategoryValues, NewCategoryParams } from "../../domain/category";

export const createCategory = async ({
  descricao,
}: NewCategoryParams): Promise<void> => {
  return Api.post({
    url: "/Categoria",
    body: {
      descricao,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const getCategories = async(): Promise<CategoryValues[]> => {
  return Api.get({
    url: "/Categoria/all"
  }).then((response) => {
    return response.data;
  }).catch((err: AxiosError<RequestError>) => {
    throw err.response?.data;
  })
}

export const LoginService = {
    createCategory,
    getCategories
};
