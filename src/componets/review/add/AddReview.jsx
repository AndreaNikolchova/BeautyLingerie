import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function AddReview() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.success('Review submitted successfully!');
            navigate(`/products/${productId}/details`);
        } catch (error) {
            toast.error('Failed to submit review');
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
     
        <div className="relative mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Add a Review</h1>
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
                placeholder='optional'/>
            </div>
          </div>
      
 
          <div className="flex justify-center gap-4 pt-4"> 
            <button
              type="button"
              onClick={() => navigate(`/products/${productId}/details`)}
              className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className={`rounded-md border border-transparent px-6 py-2 text-sm font-medium text-white shadow-sm ${rating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    );
}