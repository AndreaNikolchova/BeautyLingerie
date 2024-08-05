import Products from "../ProductsList"
import { useGetProductsByCategory } from "../../../hooks/useProducts"

export default function ProductsByCategory(props){
    const[products] = useGetProductsByCategory(props.items)
    return(
    <Products items={products}/>
    );
}