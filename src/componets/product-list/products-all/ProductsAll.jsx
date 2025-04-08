import Products from "../ProductsList"
import Loading from "../../loading/Loading";
import { useGetAllProducts } from "../../../hooks/useProducts";

export default function ProductsAll() {
const [products] = useGetAllProducts()
if (!products || Object.keys(products).length === 0) {
    return <Loading/>;
  }
    return (
        <Products items={products} />
    );
}