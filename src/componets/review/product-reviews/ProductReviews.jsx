import { StarIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { usegetAllReviewsProduct } from '../../../hooks/useReview'
import NoReviewsProduct from '../no-reviews/NoReviewsProduct';
import { toast,ToastContainer } from 'react-toastify';
import { deleteReview } from '../../../api/review-api';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../loading/Loading';


export default function ProductReviewsPage() {
  const { productId } = useParams();
  const [reviews,setReviews] = usegetAllReviewsProduct(productId)

  if(!reviews) return <Loading/>
  const currentUser = JSON.parse(sessionStorage.getItem('authState'));
  if (reviews.length == 0) {
    return <NoReviewsProduct />
  }
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const roundedAverage = Math.round(averageRating * 10) / 10;

  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    const index = 5 - Math.ceil(review.rating);
    ratingDistribution[index]++;
  });

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
  const handleDelete = async (reviewId) => {
    try {
      // Confirm deletion first
      const confirmDelete = window.confirm('Are you sure you want to delete this review?');
      if (!confirmDelete) return;
  
      // Make the API call
      await deleteReview(reviewId);
      
      // Update the state by filtering out the deleted review
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      
      toast.success('Review deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete review');
    }
  };
  return (
    <div className="product-reviews-page max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-8">Product Reviews</h1>


      <div className="review-summary flex items-center mb-8 p-5 bg-gray-50 rounded-lg">
        <div className="average-rating mr-10 text-center">
          <h2 className="text-5xl font-bold m-0">{roundedAverage}</h2>
          <div className="flex justify-center">{renderStars(averageRating)}</div>
          <p className="text-gray-500">{reviews.length} reviews</p>
        </div>

        <div className="rating-distribution flex-grow">
          {[5, 4, 3, 2, 1].map((stars, index) => (
            <div key={stars} className="flex items-center mb-2">
              <span className="w-12">{stars} star</span>
              <div className="flex-grow h-2.5 bg-gray-200 rounded mx-2">
                <div
                  className="h-full bg-yellow-400 rounded"
                  style={{ width: `${(ratingDistribution[index] / reviews.length) * 100}%` }}
                ></div>
              </div>
              <span className="w-8 text-right">{ratingDistribution[index]}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card mb-5 p-5 border border-gray-200 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="m-0 text-lg font-semibold">{review.email}</h3>
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

            {currentUser && (currentUser.email === review.email) && (
              <div className="flex justify-end space-x-2 mt-2">
                <Link
                  to={`/reviews/edit/${review.id}`}
                  className="text-purple-500 hover:text-purple-700 p-1 rounded"
                  title="Edit review"
                >
                  <PencilIcon className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded"
                  title="Delete review"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};
