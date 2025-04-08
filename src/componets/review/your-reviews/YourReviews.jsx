import { usegetAllReviewsUser } from '../../../hooks/useReview'
import { StarIcon,} from '@heroicons/react/20/solid';
import NoReviewsUser from '../no-reviews/NoReviewsUser';

export default function YourReviews() {
    const email = JSON.parse(sessionStorage.getItem('authState')).email;
    const [reviews] = usegetAllReviewsUser(email)

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <StarIcon
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                    />
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative h-5 w-5">
                        <StarIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                            <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <StarIcon
                        key={i}
                        className="h-5 w-5 text-gray-300"
                        aria-hidden="true"
                    />
                );
            }
        }

        return stars;
    };
   
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
                                {renderStars(review.rating)}
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