import { usegetAllReviewsProduct } from '../../../hooks/useReview'
import NoReviewsProduct from '../no-reviews/NoReviewsProduct';
import { ToastContainer } from 'react-toastify';

import { useParams } from 'react-router-dom';
import Loading from '../../loading/Loading';
import RenderStars from '../render-stars/RenderStars';
import ReviewList from '../review-list/ReviewList';

export default function ProductReviewsPage() {
  const { productId } = useParams();
  const [reviews,setReviews] = usegetAllReviewsProduct(productId)
  
  if(!reviews) return <Loading/>
  
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

 

  return (
    <div className="product-reviews-page max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-8">Product Reviews</h1>


      <div className="review-summary flex items-center mb-8 p-5 bg-gray-50 rounded-lg">
        <div className="average-rating mr-10 text-center">
          <h2 className="text-5xl font-bold m-0">{roundedAverage}</h2>
          <div className="flex justify-center">
          <RenderStars items={averageRating}/>
          </div>
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
       <ReviewList reviews={reviews} setReviews={setReviews}/>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};
