import Products from "../ProductsList"
import { useGetNewestArrivals } from "../../../hooks/useProducts";

export default function NewestArrivals() {
    const [products] = useGetNewestArrivals()
    return (
        <Products items={products} />
    );
}