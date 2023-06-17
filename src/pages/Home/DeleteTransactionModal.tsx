import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NewCategoryUseCase from "../../useCases/NewCategoryUseCase/NewCategoryUseCase";
import { NewCategoryButton } from "../../components/Header/styles";

import { Modal } from "../../components/Modal/index";
import { Form, FormButton, FormError, FormInput } from "../../styles/global";
import { useRef } from "react";
import GetCategoriesUseCase from "../../useCases/GetCategoryUseCase/GetCategoryCase";

interface FormProps {
  description: string;
}

const formSchema = yup
  .object({
    description: yup.string().required("O name da category é obrigatório."),
  })
  .required();

export function DeleteTransactionModal() {
    const closeModalRef = useRef<HTMLButtonElement>(null);
    const { handleSubmit,reset } = useForm<FormProps>({ resolver: yupResolver(formSchema)});
  
    async function handleCreateCategory({ description }: FormProps) {
      NewCategoryUseCase.execute({ description })
        .then(() => {
          closeModalRef.current?.click();
          GetCategoriesUseCase.execute();
        })
        .finally(() => reset());
    }
  
  
    return (
      <Modal
        title="Deseja mesmo deletar essa transação?"
        closedModalRef={closeModalRef}
        trigger={<NewCategoryButton>Deletar</NewCategoryButton>}
      >
        <Form onSubmit={handleSubmit(handleCreateCategory)}>
          <FormButton type="submit">
            Deletar
          </FormButton>
        </Form>
      </Modal>
    );
  }