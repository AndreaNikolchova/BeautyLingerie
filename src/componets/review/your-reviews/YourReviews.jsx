import { usegetAllReviewsUser } from '../../../hooks/useReview'
import NoReviewsUser from '../no-reviews/NoReviewsUser';
import RenderStars from '../render-stars/RenderStars';

export default function YourReviews() {
    const email = JSON.parse(sessionStorage.getItem('authState')).email;
    const [reviews] = usegetAllReviewsUser(email);
    
    if (reviews.length === 0) {
        return <NoReviewsUser />;
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-8">Your Reviews</h1>
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <RenderStars items={review.rating} />
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        {review.rating.toFixed(1)}
                                    </span>
                                </div>
                                <span className="text-gray-500">|</span>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {review.productName}
                                </h3>
                            </div>
                            <span className="text-sm text-gray-500">
                                Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}