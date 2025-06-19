import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneProduct } from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { StarIcon } from '@heroicons/react/20/solid'
import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading/Loading';
import { AuthContext } from '../../context/AuthContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product] = useGetOneProduct(productId);
  const { addToCart } = useCart();
  const [open, setOpen] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  
  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0].sizeName);
    }
  }, [product]);

  const goBack = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleAddToCart = () => {
    const sizeInfo = product.sizes.find(s => s.sizeName === selectedSize);

    addToCart({
      ...product,
      selectedSize,
      price: Number(product.price),
    }, quantity);

    toast.success(`${product.name} (${selectedSize}) added to cart`);
    setSelectedSize('');
    setQuantity(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleEditProduct = () => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleDeleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // You would need to implement your delete product API call here
        // await deleteProduct(productId);
        toast.success('Product deleted successfully');
        navigate('/products');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (!product || Object.keys(product).length === 0) {
    return <Loading />;
  }

  return (
    <Dialog open={open} onClose={goBack} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={goBack}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.categoryName}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        {product.price.toFixed(2)} lv.
                      </p>
                      <p className="mt-2 text-sm text-gray-700">
                        {product.description}
                      </p>
                      <div className="mt-4"></div>
                      <p className="mt-2 text-sm text-gray-700">
                        Color: {product.colorName}
                      </p>
                      <div className="mt-6">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                aria-hidden="true"
                                className={`size-5 shrink-0 ${product.reviewAverage > rating ? 'text-gray-900' : 'text-gray-200'}`}
                              />
                            ))}
                          </div>
                          <p className="sr-only">{product.reviewAverage} out of 5 stars</p>
                          <Link to={`/reviews/${productId}`} key={productId} className="ml-3 text-sm font-medium text-purple-600 hover:text-purple-500">
                            {product.reviewCount} reviews
                          </Link>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Size</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size.sizeName}
                              type="button"
                              onClick={() => handleSizeChange(size.sizeName)}
                              className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium shadow-sm ${selectedSize === size.sizeName
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                }`}
                            >
                              {size.sizeName}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedSize && (
                        <div className="mt-4">
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={product.sizes.find(s => s.sizeName === selectedSize)?.quantity || 0}
                            value={quantity}
                            onChange={(e) => {
                              const maxQty = product.sizes.find(s => s.sizeName === selectedSize)?.quantity || 0;
                              const inputValue = Number(e.target.value);
                              setQuantity(Math.max(1, Math.min(inputValue, maxQty)));
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Available: {product.sizes.find(s => s.sizeName === selectedSize)?.quantity || 0}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          if (isAuthenticated) {
                            navigate(`/products/${productId}/review`);
                          } else {
                            toast.info('Please log in to leave a review');
                            navigate('/login', { state: { from: `/products/${productId}` } });
                          }
                        }}
                        className="text-sm font-medium text-purple-600 hover:text-purple-500"
                      >
                        Add a Review
                      </button>
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          disabled={!selectedSize}
                          className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${selectedSize
                            ? 'bg-purple-600 hover:bg-purple-500'
                            : 'bg-gray-400 cursor-not-allowed'
                            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600`}
                        >
                          Add to cart
                        </button>
                      </div>

                      {/* Admin buttons */}
                      {isAdmin && (
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={handleEditProduct}
                            className="flex-1 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                          >
                            Edit Product
                          </button>
                          <button
                            onClick={handleDeleteProduct}
                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            Delete Product
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </Dialog>
  );
}