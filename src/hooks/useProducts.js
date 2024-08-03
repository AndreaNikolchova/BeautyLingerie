import { useEffect, useState } from "react"
import {getAll} from"../api/products-api";

export function useGetAllProducts(){
    const [products,setProducts] = useState([]);
    useEffect(() => {
      getAll()
        .then(result => setProducts(result));
    }, []);
    return [products,setProducts]
}