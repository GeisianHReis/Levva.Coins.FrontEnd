import { AuthLayout } from "../../layouts/AuthLayout";
import * as yup from "yup";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import NewAccountUseCase from "../../useCases/NewAccountCases/NewAccountCase";
import NewAccountStore from "../../stores/NewAccountStore/NewAccountStore";

interface FormProps {
    nome: string;
    email: string;
    senha: string;
    confirmeSenha: string;
}

const formSchema = yup.object({
    nome: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um mail válido").required("O e-mail é obrigatório"),
    senha: yup.string().required("A senha é obrigatória"),
    confirmeSenha: yup.string().required("A confirmação de senha é obrigatória").oneOf([yup.ref('senha')],"As senhas não são iguais")
}).required();

function handleNewAccount({
    nome,
    email,
    senha,
}: FormProps) {
    NewAccountUseCase.execute({nome, email, senha})
}

export function NewAccount(){

    const { isLoading, hasError, errorMessage } = useStore(NewAccountStore);

    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
            resolver: yupResolver(formSchema),
        });
    return(
        <AuthLayout title="Cadastro" subTitle="Crie sua conta e começe a gerenciar suas finanças.">
             <Form onSubmit={handleSubmit(handleNewAccount)}>
                <FormInput {...register("nome")}type="name" placeholder="Nome e sobrenome" />
                {errors.nome && <FormError>{errors.nome.message}</FormError>}

                <FormInput {...register("email")} placeholder="Email" />
                {errors.email && <FormError>{errors.email.message}</FormError>}

                <FormInput {...register("senha")}type="password" placeholder="Senha" />
                {errors.senha && <FormError>{errors.senha.message}</FormError>}
                
                <FormInput {...register("confirmeSenha")}type="password" placeholder="Confirme a senha" />
                {errors.confirmeSenha && <FormError>{errors.confirmeSenha.message}</FormError>}

                {hasError && <FormError>{errorMessage}</FormError>}

                <FormLink to="/login">Já tem conta? Acesse agora</FormLink>
                <FormButton type="submit">{isLoading ? "Carregando...." : "Criar conta"}</FormButton>
            </Form>
        </AuthLayout>
        
    )
}