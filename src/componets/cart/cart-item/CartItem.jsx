import { useEffect, useState } from 'react';
import useCart from "../../../hooks/useCart.js";
import { Link, useNavigate } from "react-router-dom";

export default function CartItem(props) {
    const navigate = useNavigate();
    const {
        removeFromCart,
        updateQuantity,
        calculateSubtotal,
        calculateShipping,
        calculateTotal,
        cartItems
    } = useCart();
    
    // Use local state that syncs with both props.items and cartItems
    const [displayItems, setDisplayItems] = useState(props.items || cartItems);

    // Sync with cartItems when they change
    useEffect(() => {
        setDisplayItems(cartItems);
    }, [cartItems]);

    // If props.items changes (from parent), update display items
    useEffect(() => {
        if (props.items) {
            setDisplayItems(props.items);
        }
    }, [props.items]);

    const handleRemove = async (itemId) => {
        try {
            await removeFromCart(itemId);
            // Optimistic update
            setDisplayItems(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Failed to remove item:", error);
            // Revert if needed
            setDisplayItems(cartItems);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        // Validate quantity
        newQuantity = Math.max(1, newQuantity);
        
        try {
            // Optimistic update
            setDisplayItems(prev => 
                prev.map(item => 
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
            
            await updateQuantity(itemId, newQuantity);
        } catch (error) {
            console.error("Failed to update quantity:", error);
            // Revert if needed
            setDisplayItems(cartItems);
        }
    };

    const handleCheckout = () => {
        if (displayItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const orderData = {
            items: displayItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl
            })),
            subtotal: calculateSubtotal(),
            shipping: calculateShipping(),
            total: calculateTotal(),
            timestamp: new Date().toISOString()
        };

        sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
        navigate('/checkout');
    };

    if (!displayItems || displayItems.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                <Link
                    to="/products"
                    className="mt-4 inline-block bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8">
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-8 lg:border-b lg:border-gray-200 lg:pb-4 lg:mb-4">
                    <div className="lg:col-span-6 text-sm font-medium text-gray-500">Product</div>
                    <div className="lg:col-span-2 text-sm font-medium text-gray-500">Price</div>
                    <div className="lg:col-span-2 text-sm font-medium text-gray-500">Quantity</div>
                    <div className="lg:col-span-2 text-sm font-medium text-gray-500">Total</div>
                </div>

                {displayItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-x-8 lg:border-b lg:border-gray-200 lg:pb-8 lg:mb-8">
                        <div className="lg:col-span-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.imageUrl || 'https://via.placeholder.com/80'}
                                    alt={item.name}
                                    className="h-20 w-20 rounded-md object-cover object-center"
                                />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-sm text-red-600 hover:text-red-800 mt-1 focus:outline-none"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 flex items-center">
                            <p className="text-sm text-gray-900">${item.price?.toFixed(2)}</p>
                        </div>

                        <div className="lg:col-span-2 flex items-center">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.quantityCart - 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{item.quantityCart}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.quantityCart + 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-2 flex items-center">
                            <p className="text-sm font-medium text-gray-900">
                                ${((item.price || 0) * item.quantityCart).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium text-gray-900">
                            ${calculateSubtotal().toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Shipping</span>
                        <span className="text-sm font-medium text-gray-900">
                            {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                        </span>
                    </div>

                    <div className="flex justify-between py-4">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <span className="text-base font-medium text-gray-900">
                            ${calculateTotal().toFixed(2)}
                        </span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors block text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Proceed to Checkout
                    </button>

                    <Link
                        to="/products"
                        className="w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors block text-center mt-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}