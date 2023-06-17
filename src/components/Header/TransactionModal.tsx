import { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useStore } from "effector-react";

import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";

import GetCategoriesUseCase from "../../useCases/GetCategoryUseCase/GetCategoryCase";
import NewTransactionUseCase from "../../useCases/NewTransactionUseCase/NewTransactionUseCase";

import CategoryStore from "../../stores/CategoryStore/CategoryStore";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";

import { NewTransactionButton } from "./styles";

import { Modal } from "../Modal";
import { Form, FormButton, FormError, FormInput, FormSelect,TransactionTypeButton, TransactionTypeContainer } from "../../styles/global";
import GetTransactionUseCase from "../../useCases/GetTransactionUseCase/GetTransactionUseCase";

interface FormProps {
  description: string;
  amount: number;
  type: string;
  categoryId: string;
  userId: number;
}

const formSchema = yup
  .object({
    description: yup.string().required("O name da transacão é obrigatória."),
    amount: yup.number().required("O preço da transacão é obrigatório."),
    type: yup
      .string()
      .oneOf(["income", "outcome"])
      .required("O tipo da transacão é obrigatório."),
    categoryId: yup
      .string()
      .required("A category da transacão é obrigatória."),
  })
  .required();

export function TransactionModal() {
  const closeModalRef = useRef<HTMLButtonElement>(null);

  const { categories } = useStore(CategoryStore);
  const { isLoading, hasError, errorMessage } = useStore(TransactionStore);
  const user = JSON.parse(window.localStorage.getItem("user") ?? "{}");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema) as any,
  });

  

  useEffect(() => {
    GetCategoriesUseCase.execute();
  }, []);

  async function handleCreateCategory({
    description,
    amount,
    type,
    categoryId,
    userId
  }: FormProps) {
    NewTransactionUseCase.execute({
      description,
      amount,
      type: type === "income" ? 0 : 1,
      categoryId,
      userId: userId = user.id,
    })
      .then(() => {
        closeModalRef.current?.click();
        GetTransactionUseCase.execute();
      })
      .finally(() => reset());
  }

  return (
    <Modal
      title="Nova transacão"
      closedModalRef={closeModalRef}
      trigger={<NewTransactionButton>Nova transacão</NewTransactionButton>}
    >
      <Form onSubmit={handleSubmit(handleCreateCategory)}>
        <FormInput {...register("description")} placeholder="Descrição" />
        {errors.description && (
          <FormError>{errors.description.message}</FormError>
        )}

        <FormInput
          {...register("amount")}
          type="number"
          placeholder="Preço"
          step="0.1"
          min="0"
          max="999999"
        />
        {errors.amount && <FormError>{errors.amount.message}</FormError>}

        <FormSelect {...register("categoryId")}>
          <option value="" selected disabled hidden>
            category
          </option>
          {categories.map((category) => (
            <option value={category.id}>{category.description}</option>
          ))}
        </FormSelect>
        {errors.categoryId && (<FormError>{errors.categoryId.message}</FormError>)}

        <TransactionTypeContainer
         {...register("type")}
         onChange={(event) => setValue("type", event.target.value)}
        >
          <TransactionTypeButton variant="income" value="income">
            <ArrowCircleUp size={24} />
            Entrada
          </TransactionTypeButton>
          <TransactionTypeButton variant="outcome" value="outcome">
            <ArrowCircleDown size={24} />
            Saída
          </TransactionTypeButton>
        </TransactionTypeContainer>
        {errors.type && <FormError>{errors.type.message}</FormError>}

        {hasError && <FormError>{errorMessage}</FormError>}

        <FormButton type="submit">
          {isLoading ? "Carregando..." : "Cadastrar"}
        </FormButton>
      </Form>
    </Modal>
  );
}