import { useEffect, useState } from "react"

import { getAll, getOne, getByCategory, getNewest, getColors } from "../api/products-api";

export function useGetAllProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAll()
            .then(result => setProducts(result));
    }, []);
    return [products, setProducts]
}
export function useGetProductsByCategory(categoryName) {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getByCategory(categoryName)
            .then(result => setProducts(result));
    }, [categoryName]);
    return [products, setProducts]
}


export function useGetOneProduct(productId) {
    const [product, setProduct] = useState({});
    useEffect(() => {
        getOne(productId)
            .then(result => setProduct(result));
    }, [productId]);
    return [product, setProduct];
}
export function useGetNewestArrivals() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getNewest()
            .then(result => setProducts(result));
    }, []);
    return [products, setProducts]
}
export function useGetColors() {

    const [colors, setColors] = useState([]);
    useEffect(() => {
        getColors()
            .then(result => setColors(result));
    }, []);
    return [colors, setColors]
}
