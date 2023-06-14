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
  descricao: string;
  valor: number;
  tipo: string;
  categoriaId: string;
  usuarioId: number;
}

const formSchema = yup
  .object({
    descricao: yup.string().required("O nome da transacão é obrigatória."),
    valor: yup.number().required("O valor da transacão é obrigatório."),
    tipo: yup
      .string()
      .oneOf(["income", "outcome"])
      .required("O valor da transacão é obrigatório."),
    categoriaId: yup
      .string()
      .required("A categoria da transacão é obrigatória."),
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
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    GetCategoriesUseCase.execute();
  }, []);

  async function handleCreateCategory({
    descricao,
    valor,
    tipo,
    categoriaId,
    usuarioId
  }: FormProps) {
    NewTransactionUseCase.execute({
      descricao,
      valor,
      tipo: tipo === "income" ? 0 : 1,
      categoriaId,
      usuarioId: usuarioId = user.id,
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
        <FormInput {...register("descricao")} placeholder="Descrição" />
        {errors.descricao && (
          <FormError>{errors.descricao.message}</FormError>
        )}

        <FormInput
          {...register("valor")}
          type="number"
          placeholder="Preço"
          step="0.1"
          min="0"
          max="999999"
        />
        {errors.valor && <FormError>{errors.valor.message}</FormError>}

        <FormSelect {...register("categoriaId")}>
          <option value="" selected disabled hidden>
            Categoria
          </option>
          {categories.map((category) => (
            <option value={category.id}>{category.descricao}</option>
          ))}
        </FormSelect>
        {errors.categoriaId && (<FormError>{errors.categoriaId.message}</FormError>)}

        <TransactionTypeContainer
         {...register("tipo")}
         onChange={(event) => setValue("tipo", event.target.value)}
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
        {errors.tipo && <FormError>{errors.tipo.message}</FormError>}

        {hasError && <FormError>{errorMessage}</FormError>}

        <FormButton type="submit">
          {isLoading ? "Carregando..." : "Cadastrar"}
        </FormButton>
      </Form>
    </Modal>
  );
}