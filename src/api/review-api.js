import * as request from "./requester";

const BASE_URL = 'https://localhost:7090'

export const getAllReviewsProduct = async (productId) => {
        return await request.get(`${BASE_URL}/reviews/${productId}`);
}
export const addReview = async(review) => {
     await request.post(`${BASE_URL}/reviews/add/${review.productId}`,review);
    
}