import { AuthLayout } from "../../layouts/AuthLayout";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";

import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginUseCase from "../../useCases/LoginUseCases/LoginUseCase";
import { useStore } from "effector-react";
import LoginStore from "../../stores/LoginStore/loginStore";

interface FormProps {
    email: string;
    senha: string;
}

const formSchema = yup.object({
    email: yup
        .string()
        .email("Digite um mail válido")
        .required("O mail é obrigatório"),
    senha: yup
        .string()
        .required("A senha é obrigatória"),
}).required();

export function Login(){

    const { isLoading, hasError, errorMessage } = useStore(LoginStore);

    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(formSchema)
    });

    function handleLogin({email, senha}: FormProps) {
        LoginUseCase.execute({email, senha});
    }
    
    return(
        <AuthLayout title="Login" subTitle="Gerenciar suas entradas e saídas nunca foi tão simples.">
            <Form onSubmit={handleSubmit(handleLogin)}>
                <FormInput {...register("email")} placeholder="Email" />
                {errors.email && <FormError>{errors.email.message}</FormError>}

                <FormInput {...register("senha")} type="password" placeholder="Senha" />
                {errors.senha && <FormError>{errors.senha.message}</FormError>}

                <FormLink to="/new-account">Não tem conta? Crie agora</FormLink>

                {hasError && <FormError>{errorMessage}</FormError>}
                <FormButton type="submit">{isLoading ? "Carregando...." : "Entrar"}</FormButton>
            </Form>
        </AuthLayout>
    );
}