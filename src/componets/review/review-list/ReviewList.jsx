import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { deleteReview } from '../../../api/review-api';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import RenderStars from '../render-stars/RenderStars';

export default function ReviewList({reviews,setReviews}){
    const currentUser = JSON.parse(sessionStorage.getItem('authState'));
     const handleDelete = async (reviewId) => {
        try {
        
          const confirmDelete = window.confirm('Are you sure you want to delete this review?');
          if (!confirmDelete) return;
    
          await deleteReview(reviewId);
        
          setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
          
          toast.success('Review deleted successfully!');
        } catch (error) {
          console.error('Delete error:', error);
          toast.error(error.response?.data?.message || 'Failed to delete review');
        }
      };
    return(
        <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card mb-5 p-5 border border-gray-200 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="m-0 text-lg font-semibold">{review.email}</h3>
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
    );
}