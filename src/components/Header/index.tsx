import { HeaderContainer, HeaderContent, SignOutButton, UserAvatar } from "./styles";

import logo from "../../assets/Logo.svg"
import { ReactNode } from "react";
import { Modal } from "../Modal";
import { Form, FormButton, FormInput } from "../../styles/global";
import { router } from "../../Router";
import { CategoryModal } from "./CategoryModal";
import { TransactionModal } from "./TransactionModal";

export function Header(){

    const userAvatar: ReactNode = (
        <UserAvatar src="https://placehold.co/400" alt="Em branco"/>
    );
    function handleSignOut() {
        window.localStorage.removeItem("user");
        router.navigate("/login");
      }

    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={logo}/>               
                <div>
                    <CategoryModal/>
                    <TransactionModal/>
                </div>
                <Modal title="Meu perfil" trigger={userAvatar}>
                    <Form>
                        <UserAvatar 
                            src="https://placehold.co/400"
                            alt="Imagem perfil"
                            variant="large"
                        />
                        <FormInput type="name" value="Teste" />
                        <FormInput type="email" placeholder="teste@levva.io" disabled/>
                        <FormButton type="submit">Atualizar</FormButton>
                        <SignOutButton type="button" onClick={handleSignOut}>
                            Sair
                        </SignOutButton>
                    </Form>        
                </Modal>
            </HeaderContent>
            
        </HeaderContainer>
    )
}