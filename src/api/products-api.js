import * as request from "./requester";


const BASE_URL = 'https://localhost:7090'

export const getAll = async () => {
        return await request.get(`${BASE_URL}/Products`);
}

export const getByCategory = async (categoryName) => {
        return await request.get(`${BASE_URL}/Products/Category/${categoryName}`);
}
export const getOne = async (id) => {
        return await request.get(`${BASE_URL}/Products/${id}`);
}
export const getNewest = async()=>{
        return await request.get(`${BASE_URL}/Products/NewArrivals`);
}
export const getColors = async()=>{
        return await request.get(`${BASE_URL}/Color`);
}