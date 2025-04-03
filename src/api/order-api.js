import {post} from "./requester";

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
 await post(`${BASE_URL}/Order/Add-guest`,formattedData);

}
