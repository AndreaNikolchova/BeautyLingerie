import { useState, useEffect } from 'react';
import { postOrder } from '../api/order-api.js';
import useCart from '../hooks/useCart.js';

export default function useCheckout() {
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    shippingAddress: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('pendingOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if(customerInfo.email==''){
        customerInfo.email = JSON.parse(sessionStorage.getItem('authState')).email;
      }
      await postOrder({
        ...order,
        ...customerInfo,
      });

      clearCart();
      sessionStorage.removeItem('pendingOrder');
      setOrderSuccess(true);
      setOrder(null);
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    order,
    customerInfo,
    setCustomerInfo,
    isSubmitting,
    orderSuccess,
    handleSubmit,
  };
}
