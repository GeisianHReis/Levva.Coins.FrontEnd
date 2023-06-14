import { router } from "../../Router";
import { LoginParams, LoginValues } from "../../domain/login";
import { RequestError } from "../../domain/request";
import { LoginService } from "../../services/LoginService/loginService";
import { loadLogin, loadLoginDone, loadLoginFail } from "../../stores/LoginStore/loginEvents";

const execute = async ({email, senha}: LoginParams ): Promise<void> => {
    loadLogin();
     
    return LoginService.authenticateUser({ email, senha}).then(
        
        (user: LoginValues) => {
            
            window.localStorage.setItem("user", JSON.stringify(user));
            loadLoginDone();
            router.navigate("/home");
        }
    ).catch(({ hasError, message}: RequestError) => {
        loadLoginFail({hasError, message});
    });
};

const LoginUseCase = {
    
    execute,
    
};

export default LoginUseCase;