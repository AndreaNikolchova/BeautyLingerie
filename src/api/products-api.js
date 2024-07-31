import * as request from "./requester";


const BASE_URL = 'https://localhost:7090/api/Products'

export  const getAll = async () => {
        const result = await request.get(BASE_URL);
        return result;}