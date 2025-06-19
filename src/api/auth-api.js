import {get, post} from "./requester";

const BASE_URL = "https://localhost:7090";

export const login = async(email,password) => {
    const authData = await post(`${BASE_URL}/login`,{email,password});
    return authData;
}
export const register = async(email,password) => {
    const result = await post(`${BASE_URL}/register`,{email,password});
    return result;
}
 export const fetchUser = async (changeAuthState) => {
    try {
      const result = await get(`${BASE_URL}/profile`);
      if (result!==null) {
        changeAuthState({
          email: result.email,
          isAuthenticated: true,
          isAdmin: result.isAdmin,
        });
      } else {
        changeAuthState({
          email: '',
          isAuthenticated: false,
          isAdmin: false,
        });
      }
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };
  export const logoutReq = async(changeAuthState)=>{
    await post(`${BASE_URL}/logout`);
  
        changeAuthState({
          email: "",
          isAdmin: false,
          isAuthenticated: false,
        });
  }