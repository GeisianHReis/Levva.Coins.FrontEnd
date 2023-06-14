import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "./helpers/validateToken";

export function ProtectedRoutes() {
    const isAutheticated = validateToken();

    return isAutheticated ? <Outlet /> : <Navigate to="/login" />;
}