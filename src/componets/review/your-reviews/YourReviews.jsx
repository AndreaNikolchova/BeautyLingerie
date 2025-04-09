import { usegetAllReviewsUser } from '../../../hooks/useReview'
import NoReviewsUser from '../no-reviews/NoReviewsUser';
import RenderStars from '../render-stars/RenderStars';

export default function YourReviews() {
    const email = JSON.parse(sessionStorage.getItem('authState')).email;
    const [reviews] = usegetAllReviewsUser(email);
    if (reviews.length == 0) {
        return <NoReviewsUser />
    }
    return (
        <div className="product-reviews-page max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-8">Your Reviews</h1>
            <div className="review-list">
                {reviews.map(review => (
                    <div key={review.id} className="review-card mb-5 p-5 border border-gray-200 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                                <RenderStars items={review.rating}/>
                            </div>
                        </div>

                        <div className="flex items-center mb-2">
                            <span className="ml-auto text-gray-500 text-sm">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <p className="m-0">{review.comment}</p>

                    </div>
                ))}
            </div>
        
        </div>
    );
}