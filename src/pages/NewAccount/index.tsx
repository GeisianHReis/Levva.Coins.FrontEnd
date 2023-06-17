import { AuthLayout } from "../../layouts/AuthLayout";
import * as yup from "yup";
import { Form, FormButton, FormError, FormInput, FormLink } from "../../styles/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import NewAccountUseCase from "../../useCases/NewAccountCases/NewAccountCase";
import NewAccountStore from "../../stores/NewAccountStore/NewAccountStore";

interface FormProps {
    name: string;
    email: string;
    password: string;
    confirmepassword: string;
}

const formSchema = yup.object({
    name: yup.string().required("O name é obrigatório"),
    email: yup.string().email("Digite um mail válido").required("O e-mail é obrigatório"),
    password: yup.string().required("A password é obrigatória"),
    confirmepassword: yup.string().required("A confirmação de password é obrigatória").oneOf([yup.ref('password')],"As passwords não são iguais")
}).required();

function handleNewAccount({
    name,
    email,
    password,
}: FormProps) {
    NewAccountUseCase.execute({name, email, password})
}

export function NewAccount(){

    const { isLoading, hasError, errorMessage } = useStore(NewAccountStore);

    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
            resolver: yupResolver(formSchema),
        });
    return(
        <AuthLayout title="Cadastro" subTitle="Crie sua conta e começe a gerenciar suas finanças.">
             <Form onSubmit={handleSubmit(handleNewAccount)}>
                <FormInput {...register("name")}type="name" placeholder="Nome e sobrenome" />
                {errors.name && <FormError>{errors.name.message}</FormError>}

                <FormInput {...register("email")} placeholder="Email" />
                {errors.email && <FormError>{errors.email.message}</FormError>}

                <FormInput {...register("password")}type="password" placeholder="password" />
                {errors.password && <FormError>{errors.password.message}</FormError>}
                
                <FormInput {...register("confirmepassword")}type="password" placeholder="Confirme a senha" />
                {errors.confirmepassword && <FormError>{errors.confirmepassword.message}</FormError>}

                {hasError && <FormError>{errorMessage}</FormError>}

                <FormLink to="/login">Já tem conta? Acesse agora</FormLink>
                <FormButton type="submit">{isLoading ? "Carregando...." : "Criar conta"}</FormButton>
            </Form>
        </AuthLayout>
        
    )
}