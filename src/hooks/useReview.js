import { useEffect, useState } from "react"
import { getAllReviewsProduct ,getReview,getAllReviewsUser } from "../api/review-api";

export function usegetAllReviewsProduct(productId) {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getAllReviewsProduct(productId)
            .then(result => setReviews(result));
    }, []);

    return [reviews, setReviews]
}
export function usegetAllReviewsUser(email) {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getAllReviewsUser(email)
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
