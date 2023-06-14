import {ReactNode} from "react";
import logo from "../../assets/Logo.svg"
import { AuthBackground, AuthContent, AuthWrapper } from "./styles";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subTitle: string;
}

export function AuthLayout({ children, title, subTitle}: AuthLayoutProps){
    return(
        <AuthBackground>
            <AuthWrapper>
                <header>
                    <img src={logo} alt="Logo levva coins"/>
                </header>
            
                <AuthContent>
                    <div>
                        <h2>{title}</h2>
                        <p>{subTitle}</p>
                    </div>
                </AuthContent>
                {children}
            </AuthWrapper>
        </AuthBackground>
    )
}