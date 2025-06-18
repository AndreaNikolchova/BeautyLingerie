import { createContext } from "react";


export const AuthContext = createContext({
  email: '',
  isAuthenticated: false,
  isAdmin: false,
  changeAuthState: () => null,
  fetchUser:()=>null
});
