import { useState, useEffect } from 'react';
import { getOrders, getOrderById } from '../api/order-api';

export function useGetOrders() {
    const email = JSON.parse(sessionStorage.getItem('authState')).email
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        getOrders(email)
            .then(result => setOrder(result));
    }, []);

    return [orders, setOrder]
}
export function useGetOrderById(orderId) {
  
    const [order, setOrder] = useState({});
    useEffect(() => {
        getOrderById(orderId)
            .then(result => setOrder(result));
    }, []);

    return [order, setOrder]
}