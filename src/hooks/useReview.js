import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { getAllReviewsProduct, deleteReview ,getReview } from "../api/review-api";

export function usegetAllReviewsProduct(productId) {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getAllReviewsProduct(productId)
            .then(result => setReviews(result));
    }, []);

    return [reviews, setReviews]
}
export function useReviewById(reviewId) {

    const [review, setReview] = useState({});
    useEffect(() => {
        getReview(reviewId)
            .then(result => setReview(result));
    }, []);

    return [review, setReview]
}
export function deleteReviewHook(reviewId,productId) {
    const navigate = useNavigate()
    deleteReview(reviewId);
    navigate(`reviews/${productId}`);

}