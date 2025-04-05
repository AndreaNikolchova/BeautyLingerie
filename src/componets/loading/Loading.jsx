export default function Loading() {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mb-4"></div>
            <p>Loading...</p>
        </div>
    </div>);
}