import { Link, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart.js";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    calculateSubtotal,
    calculateShipping,
    calculateTotal,
    getItemCount
  } = useCart();

  const handleCheckout = () => {
    const orderData = {
      items: cartItems.map(item => ({
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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Your Shopping Cart ({getItemCount()} items)
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-700 mb-4">Your cart is empty</p>
            <Link 
              to="/products" 
              className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-8">
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-8 lg:border-b lg:border-gray-200 lg:pb-4 lg:mb-4">
                <div className="lg:col-span-6 text-sm font-medium text-gray-500">Product</div>
                <div className="lg:col-span-2 text-sm font-medium text-gray-500">Price</div>
                <div className="lg:col-span-2 text-sm font-medium text-gray-500">Quantity</div>
                <div className="lg:col-span-2 text-sm font-medium text-gray-500">Total</div>
              </div>
              
              {cartItems.map((item) => (
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
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-600 hover:text-red-800 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="text-sm text-gray-900">${item.price?.toFixed(2)}</p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="text-sm font-medium text-gray-900">
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-gray-50 p-6 rounded-lg">
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
                    {calculateShipping() === 0 ? 'Free' : '$15.00'}
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
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors block text-center"
                >
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/products"
                  className="w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors block text-center mt-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}