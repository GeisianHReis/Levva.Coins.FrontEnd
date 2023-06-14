import {Navigate, Outlet, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import { Login } from "./pages/Login";
import { NewAccount } from "./pages/NewAccount";
import { Home } from "./pages/Home";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { validateToken } from "./helpers/validateToken";

const isAuthenticaed = validateToken();

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route element={isAuthenticaed ? <Navigate to="/home"/> : <Outlet />}>
            <Route index path="/login" element={<Login />} />
            <Route path="/new-account" element={<NewAccount/>}/>
        </Route>
        
        <Route element={<ProtectedRoutes/>}>
            <Route path="/home" element={<Home/>}/>
        </Route>
    </Route>
))