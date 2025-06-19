import * as request from "./requester";


const BASE_URL = 'https://localhost:7090'

export const getAll = async () => {
        return await request.get(`${BASE_URL}/products`);
}

export const getByCategory = async (categoryName) => {
        return await request.get(`${BASE_URL}/products/category/${categoryName}`);
}
export const getOne = async (id) => {  
       return request.get(`${BASE_URL}/products/${id}`);
}
export const getNewest = async()=>{
        return await request.get(`${BASE_URL}/products/newArrivals`);
}
export const getColors = async()=>{
        return await request.get(`${BASE_URL}/color`);
}
export const addToCart= async()=>{
        return await request.post(`${BASE_URL}/addToCart`)
}
export const getProductsFromCart = async()=>{
        return await request.get(`${BASE_URL}/products/cart`);
}