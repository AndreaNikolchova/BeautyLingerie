import { useNavigate,useParams } from 'react-router-dom';

import OrderStatusBadge from '../order-status/OrderStatusBadge';
import { formatDate } from '../../../utils/helper';
import { useGetOrderById } from '../../../hooks/useOrder';
import Loading from '../../loading/Loading';

export default function OrderDetails(){
  const navigate = useNavigate();
  const { orderId } = useParams();
  const[order] = useGetOrderById(orderId);
  if(Object.keys(order).length === 0){
    return <Loading/>;
  }
  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-700">Order not found</h2>
        <button 
          onClick={() => navigate('/orders')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Order #{order.id}
        </h1>
        <button 
          onClick={() => navigate('/orders')}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Orders
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Order Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Placed on {formatDate(order.createdOn)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <OrderStatusBadge status={order.status} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
            <p className="text-lg font-medium text-gray-900">
              {order.totalSum.toFixed(2)} lv.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Items</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {order.products.map((item) => (
              <li key={item.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1 px-4">
                      <div className="text-sm font-medium text-indigo-600 truncate">
                        {item.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {item.price.toFixed(2)} lv. × {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-900">
                    {(item.price * item.quantity).toFixed(2)} lv.
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <address className="not-italic">
            <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium"> Full name:</span> {order.fullName}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium"> Shipping address:</span> {order.shippingAddress}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium">Phone:</span> {order.phoneNumber}
              </div>
            </address>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="text-sm text-gray-900">
              Pay at Delivery
            </div>
         
          </div>
        </div>
       
      </div>
    </div>
  );
};

