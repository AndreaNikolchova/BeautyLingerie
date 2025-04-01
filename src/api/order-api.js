import {post} from "./requester";

const BASE_URL = "https://localhost:7090";

export const postOrder = async(orderObj) => {
  console.log(orderObj)
    const orderData = await post(`${BASE_URL}/order/add-guest`,{orderObj});
  console.log(orderData)
}
