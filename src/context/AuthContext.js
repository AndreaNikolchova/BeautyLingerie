import {createContext} from "react"

export const AuthContext = createContext({
    email: '',
    accessToken: '',
    isAuthenticated: false,
    isAdmin:false,
    changeAuthState:(authState = {}) => null,
  });