import { useContext } from "react";
import { login, register } from "../api/auth-api";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext)
    const loginHadler = async (email, password) => {
        const result = await login(email, password);
        changeAuthState(result);
        return result;
    }
    return loginHadler;
}
export const useRegister  = () =>{
 const registerHandler = async (firstName,lastName,email,password)=>{
    const result = await register(firstName,lastName,email, password);
    console.log(result);
    return result
 }
 return registerHandler;
}