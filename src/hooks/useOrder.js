import { useState, useEffect } from 'react';
import { getOrders } from '../api/order-api';

export function useGetOrders() {
    const email = JSON.parse(sessionStorage.getItem('authState')).email
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        getOrders(email)
            .then(result => setOrder(result));
    }, []);

    return [orders, setOrder]
}