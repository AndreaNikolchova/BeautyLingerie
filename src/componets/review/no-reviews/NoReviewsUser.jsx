import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

export default function NoReviewsProduct() {
    const { isAuthenticated } = useContext(AuthContext);
     const { productId } = useParams();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 p-6 bg-gray-100 rounded-full">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 text-center max-w-md">
               Go write some reviews! 
            </p>
           
        </div>
    );
};

