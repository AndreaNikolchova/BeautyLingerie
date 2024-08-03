import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import {getAll, getOne} from"../api/products-api";

export function useGetAllProducts(){
    const [products,setProducts] = useState([]);
    useEffect(() => {
      getAll()
        .then(result => setProducts(result));
    }, []);
    return [products,setProducts]
}

export function useGetOneProduct(){
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        getOne(productId)
            .then(result => setProduct(result));
    }, []);
    return [product,setProduct];
}