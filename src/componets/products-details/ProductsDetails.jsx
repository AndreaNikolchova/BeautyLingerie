
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneProduct } from '../../hooks/useProducts'
import useCart from '../../hooks/useCart.js';

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
export default function ProductDetails() {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const [product] = useGetOneProduct(productId);
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();

  const goBack = () => {
    setOpen(false);
    navigate(-1);
  }

  return (
    <Dialog open={open} onClose={goBack} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={goBack}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img alt={product.imageAlt} src={product.imageUrl} className="object-cover object-center" />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900 mb-4">{product.price} lv.</p>
                    <p className="text-lg text-black-900">Color : {product.colorName}</p>
                    <p className="text-lg text-black-900">Size : {product.size}</p>

                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">

                    <button
                       
                       onClick={() => addToCart(product)}
                      className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Add to cart
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
