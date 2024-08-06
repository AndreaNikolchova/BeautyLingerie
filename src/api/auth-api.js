import {post} from "./requester";

const BASE_URL = "https://localhost:7090";

export const login = async(email,password) => {
    const authData = await post(`${BASE_URL}/login`,{email,password});
    return authData;
}
export const register = async(firstName,lastName,email,password) => {
    const result = await post(`${BASE_URL}/Customer/Add`,{firstName,lastName,email,password});
    return result;
}