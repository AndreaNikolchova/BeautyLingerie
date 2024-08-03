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
 console.log('inuseReg')
 const registerHandler = async (email,password)=>{
    const result = await register(email, password);
    console.log(result);
    return result
 }
 return registerHandler;
}