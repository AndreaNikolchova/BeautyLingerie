import Products from "../ProductsList"
import Loading from "../../loading/Loading";
import { useGetProductsByCategory } from "../../../hooks/useProducts"

export default function ProductsByCategory(props){
    const[products] = useGetProductsByCategory(props.items)
    if (!products || Object.keys(products).length === 0) {
        return <Loading/>;
      }
    return(
    <Products items={products}/>
    );
}