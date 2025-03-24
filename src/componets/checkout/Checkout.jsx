import { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart.js';

export default function Checkout() {
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  useEffect(() => {
 
    const savedOrder = sessionStorage.getItem('pendingOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    try {
      const response = await fetch('/api/orders/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...order,
          customer: customerInfo
        }),
      });

      if (response.ok) {
     
        clearCart();
        sessionStorage.removeItem('pendingOrder');
      
      }
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  if (!order) return <div>Loading order...</div>;

  return (
    <div className="checkout-container">
      <h2>Guest Checkout</h2>
      <form onSubmit={handleSubmit}>
        {}
        <input
          type="text"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
          placeholder="Email"
          required
        />
        <textarea
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
          placeholder="Shipping Address"
          required
        />
        
        {}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {order.items.map(item => (
            <div key={item.id} className="order-item">
              {item.name} - {item.quantity} x ${item.price}
            </div>
          ))}
          <div>Total: ${order.total.toFixed(2)}</div>
        </div>
        
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}