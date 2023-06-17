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
    password: string;
}

const formSchema = yup.object({
    email: yup
        .string()
        .email("Digite um mail válido")
        .required("O mail é obrigatório"),
    password: yup
        .string()
        .required("A Senha é obrigatória"),
}).required();

export function Login(){

    const { isLoading, hasError, errorMessage } = useStore(LoginStore);

    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(formSchema)
    });

    function handleLogin({email, password}: FormProps) {
        LoginUseCase.execute({email, password});
    }
    
    return(
        <AuthLayout title="Login" subTitle="Gerenciar suas entradas e saídas nunca foi tão simples.">
            <Form onSubmit={handleSubmit(handleLogin)}>
                <FormInput {...register("email")} placeholder="Email" />
                {errors.email && <FormError>{errors.email.message}</FormError>}

                <FormInput {...register("password")} type="password" placeholder="password" />
                {errors.password && <FormError>{errors.password.message}</FormError>}

                <FormLink to="/new-account">Não tem conta? Crie agora</FormLink>

                {hasError && <FormError>{errorMessage}</FormError>}
                <FormButton type="submit">{isLoading ? "Carregando...." : "Entrar"}</FormButton>
            </Form>
        </AuthLayout>
    );
}