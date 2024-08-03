import { login } from "../api/auth-api";

export const useLogin = ()=> {
    const loginHadler  = async(email,password)=>{
      
            await login(email,password);
    
    }
    return loginHadler;
}