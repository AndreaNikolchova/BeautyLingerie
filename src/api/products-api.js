import * as request from "./requester";


const BASE_URL = 'https://localhost:7090/api/Products'

export const getAll = async () => {
        return await request.get(BASE_URL);
}
export const getOne = async (id) => {
        return await request.get(`${BASE_URL}/${id}`);
}