import { useEffect, useState } from "react"

import {getAll, getOne} from"../api/products-api";

export function useGetAllProducts(){
    const [products,setProducts] = useState([]);
    useEffect(() => {
      getAll()
        .then(result => setProducts(result));
    }, []);
    return [products,setProducts]
}

export function useGetOneProduct(productId){
    const [product, setProduct] = useState({});
    useEffect(() => {
        getOne(productId)
            .then(result => setProduct(result));
    }, [productId]);
    return [product,setProduct];
}