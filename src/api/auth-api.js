import {post} from "./requester";

const BASE_URL = "https://localhost:7090";

export const login = async(email,password) => {
    const authData = await post(`${BASE_URL}/Login`,{email,password});
    return authData;
}
export const register = async(email,password) => {
    const result = await post(`${BASE_URL}/Register`,{email,password});
    return result;
}