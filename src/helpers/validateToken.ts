import jwt from "jsonwebtoken";
import { LoginValues } from "../domain/login";

export function validateToken() {
    const user = JSON.parse(
        window.localStorage.getItem("user") ?? "{}"
    ) as LoginValues;

    if(!user.token)
        return false;

    return jwt.verify(user.token.split(" ")[1], "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855", (error) => {
        return error ? false : true;
    });
}