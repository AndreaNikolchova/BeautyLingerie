import { useContext } from "react";
import { login } from "../api/auth-api";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext)
    const loginHadler = async (email, password) => {
        const result = await login(email, password);
        changeAuthState(result);
    }
    return loginHadler;
}