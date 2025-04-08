import * as request from "./requester";

const BASE_URL = 'https://localhost:7090'

export const getAllReviewsProduct = async (productId) => {
        return await request.get(`${BASE_URL}/reviews/${productId}`);
}
export const getAllReviewsUser = async (email) => {
        return await request.get(`${BASE_URL}/reviews/user/${email}`);
}
export const getReview = async (reviewId) => {
        return await request.get(`${BASE_URL}/review/${reviewId}`);
}
export const addReview = async(review) => {
     await request.post(`${BASE_URL}/reviews/add/${review.productId}`,review);
    
}
export const editReview = async(review) => {
        await request.put(`${BASE_URL}/reviews/edit/${review.productId}`,review);
       
}
export const deleteReview = async(reviewId) => {
        await request.del(`${BASE_URL}/reviews/delete/${reviewId}`);
}