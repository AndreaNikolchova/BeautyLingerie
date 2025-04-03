import Products from "../ProductsList"
import { useGetAllProducts } from "../../../hooks/useProducts";

export default function ProductsAll() {
    const [products] = useGetAllProducts()
   
    return (
        <Products items={products} />
    );
}