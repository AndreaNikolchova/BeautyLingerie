import ConfirmedOrder from '../checkout/confirmed-order/ConfirmedOrder.jsx';
import LoadingOrder from '../checkout/loading-order/LoadingOrder.jsx';
import useCheckout from '../../hooks/useChekout.js';

export default function Checkout() {
  const {
    order,
    customerInfo,
    setCustomerInfo,
    isSubmitting,
    orderSuccess,
    handleSubmit,
  } = useCheckout();

  if (!order && !orderSuccess) return <LoadingOrder />;

  if (orderSuccess) return <ConfirmedOrder />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
          <p className="mt-2 text-sm text-gray-600">Complete your purchase</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {order.products.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-md object-cover"
                        src={item.imageUrl || 'https://via.placeholder.com/80'}
                        alt={item.name}
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} × {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                <p>Shipping</p>
                <p>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={customerInfo.fullName}
                  onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={customerInfo.phoneNumber}
                  onChange={(e) => setCustomerInfo({...customerInfo, phoneNumber: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0892873649"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <textarea
                  id="address"
                  rows={4}
                  value={customerInfo.shippingAddress}
                  onChange={(e) => setCustomerInfo({...customerInfo, shippingAddress: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="123 Main St, City, Country"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
