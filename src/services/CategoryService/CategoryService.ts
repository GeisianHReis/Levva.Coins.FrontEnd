import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domain/request";
import { CategoryValues, NewCategoryParams } from "../../domain/category";

export const createCategory = async ({
  description,
}: NewCategoryParams): Promise<void> => {
  return Api.post({
    url: "/category",
    body: {
      description,
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
    url: "/category/all"
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
