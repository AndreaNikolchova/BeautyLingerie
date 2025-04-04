import * as request from "./requester";


const BASE_URL = 'https://localhost:7090'

export const getAll = async () => {
        return await request.get(`${BASE_URL}/Products`);
}

export const getByCategory = async (categoryName) => {
        return await request.get(`${BASE_URL}/Products/Category/${categoryName}`);
}
export const getOne = async (id) => {  
       return request.get(`${BASE_URL}/Products/${id}`);
}
export const getNewest = async()=>{
        return await request.get(`${BASE_URL}/Products/NewArrivals`);
}
export const getColors = async()=>{
        return await request.get(`${BASE_URL}/Color`);
}
export const addToCart= async()=>{
        return await request.post(`${BASE_URL}/AddToCart`)
}
export const getProductsFromCart = async()=>{
        return await request.get(`${BASE_URL}/Products/Cart`);
}