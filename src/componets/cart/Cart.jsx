
import useCart from "../../hooks/useCart.js";
import CartItem from "./cart-item/CartItem.jsx";
import EmptyCart from "./empty-cart/EmptyCart.jsx";

export default function Cart() {
 
  const {
    cartItems,
    getItemCount
  } = useCart();


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      
        {cartItems.length === 0 ? (
         <EmptyCart></EmptyCart>
        ) : (
        <CartItem items={cartItems} ></CartItem>
      
        )}
      </div>
    </div>)
}

