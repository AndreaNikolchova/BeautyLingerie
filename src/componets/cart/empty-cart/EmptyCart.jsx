import { Link } from "react-router-dom";
export default function EmptyCart() {
    return (
    <div className="text-center py-12">
        <p className="text-lg text-gray-700 mb-4">Your cart is empty</p>
        <Link
            to="/products"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
            Continue Shopping
        </Link>
    </div>);
}