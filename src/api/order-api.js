
import * as request from "./requester";

const BASE_URL = "https://localhost:7090";

export const postOrder = async(orderObj) => {
  const formattedData = {
    totalSum: orderObj.total,
    products: orderObj.products,
    createdOn: orderObj.timestamp,
    fullName: orderObj.fullName,
    email: orderObj.email,
    phoneNumber: orderObj.phoneNumber, 
    shippingAddress: orderObj.shippingAddress
};
 await request.post(`${BASE_URL}/order/add-guest`,formattedData);

}
export const getOrders = async(email) =>{
   return await request.get(`${BASE_URL}/orders/${email}`);
}
export const getOrderById = async(orderId) =>{
  return await request.get(`${BASE_URL}/order/${orderId}`);
}