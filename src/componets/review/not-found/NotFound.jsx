import { Link } from 'react-router-dom';
export default function NotFound(){
    return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Review Not Found</h3>
                <p className="mt-2 text-gray-600">
                    We couldn't find the review you're looking for. It may have been removed or doesn't exist.
                </p>
                <div className="mt-6">
                    <Link
                        to="/reviews"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Browse Reviews
                    </Link>
                </div>
            </div>
        </div>);
}