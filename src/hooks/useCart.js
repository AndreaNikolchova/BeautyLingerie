import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useCart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = sessionStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            const availableQuantity = product.maxQuantity || Infinity;
            
            const currentQty = existingItem ? existingItem.quantity : 0;
            const newQty = Math.min(currentQty + quantity, availableQuantity);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { 
                            ...item, 
                            quantity: newQty,
                            price: Number(product.price) || 0
                          }
                        : item
                );
            }
            
            return [
                ...prevItems, 
                { 
                    ...product, 
                    quantity: newQty,
                    price: Number(product.price) || 0
                }
            ];
        });
    };
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity, quantityAll) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === productId) {
                    const quantity = Math.max(1, Math.min(newQuantity, quantityAll));
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        return subtotal > 100 ? 0 : 15;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping();
    };

    const getItemCount = () => {
        return cartItems.reduce((count, item) => {
            const quantity = Number(item.quantity) || 0;
            return count + quantity;
        }, 0);
    };

    const handleCheckout = (cartProducts) => {
        const orderData = {
            products: cartProducts.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                selectedSize: item.selectedSize
            })),
            subtotal: calculateSubtotal(),
            shipping: calculateShipping(),
            total: calculateTotal(),
            timestamp: new Date().toISOString()
        };

        sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
        navigate('/checkout');
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateSubtotal,
        calculateShipping,
        calculateTotal,
        getItemCount,
        handleCheckout
    };
}