import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editReview } from '../../../api/review-api';
import { useReviewById } from '../../../hooks/useReview';
import NotFound from '../not-found/NotFound';

export default function EditReview() {
    const { reviewId } = useParams();
    const [review] = useReviewById(reviewId);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (review) {
            setRating(review.rating);
            setComment(review.comment);
        }
    }, [review]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await editReview({ id: reviewId, rating, comment });
            toast.success('Review edited successfully!');
            navigate(`/reviews/${review.productId}`);
        } catch (error) {
            toast.error(error.message || 'Failed to edit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!review || Object.keys(review).length === 0) return <NotFound/>;

    return (
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="relative mb-8">
                <h1 className="text-2xl font-bold text-gray-900 text-center">Edit Review</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 text-center">
                        Your Rating
                    </label>
                    <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="text-4xl focus:outline-none text-yellow-400"
                            >
                                {star <= (hover || rating) ? '★' : '☆'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 text-center">
                        Your Review
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="comment"
                            name="comment"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
                            placeholder='Share your thoughts...'
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  
                    <button
                        type="submit"
                        disabled={rating === 0 || isSubmitting}
                        className={`rounded-md border border-transparent px-6 py-2 text-sm font-medium text-white shadow-sm ${rating === 0 || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}