import { useEffect, useState } from "react"

import { getAllReviewsProduct } from "../api/review-api";

export function usegetAllReviewsProduct(productId) {
    
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getAllReviewsProduct(productId)
            .then(result => setReviews(result));
    }, []);
 
    return [reviews, setReviews]
}
