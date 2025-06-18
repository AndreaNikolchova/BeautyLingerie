import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchUser } from './api/auth-api.js';

import { AuthContext } from '../src/context/AuthContext.js';
import Header from './componets/header/Header';
import Home from './componets/home/Home';
import ProductDetails from './componets/products-details/ProductsDetails';
import Cart from './componets/cart/Cart';
import Checkout from './componets/checkout/Checkout';
import Login from './componets/login/Login';
import Register from './componets/register/Register';
import ProductsByCategory from './componets/product-list/products-by-category/ProductsByCategory';
import ProductsAll from './componets/product-list/products-all/ProductsAll';
import NewestArrivals from './componets/product-list/newest-products/NewestArrivals';
import LogoutItem from './componets/logout-item/LogoutItem.jsx';
import AddReview from './componets/review/add/AddReview.jsx';
import ProductReviewsPage from './componets/review/product-reviews/ProductReviews.jsx';
import EditReview from './componets/review/edit/EditReview.jsx';
import YourReviews from './componets/review/your-reviews/YourReviews.jsx';
import AboutPage from './componets/about/About.jsx';
import MyOrder from './componets/orders/my-order/MyOrders.jsx';
import OrderById from './componets/orders/order-by-id/OrderById.jsx';

function App() {
  const [authState, setAuthState] = useState({
    email: '',
    isAuthenticated: false,
    isAdmin: false,
  });

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  useEffect(() => {
    fetchUser(changeAuthState);
  }, []);

  const contextData = {
    email: authState.email,
    isAuthenticated: authState.isAuthenticated,
    isAdmin: authState.isAdmin,
    changeAuthState,
    fetchUser
  };
    return (
    <AuthContext.Provider value={contextData}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsAll />} />
        <Route path='/products/bikini' element={<ProductsByCategory items='bikini' />} />
        <Route path='/products/underwear' element={<ProductsByCategory items='underwear' />} />
        <Route path='/products/others' element={<ProductsByCategory items='others' />} />
        <Route path='/products/new-arrivals' element={<NewestArrivals items='others' />} />
        <Route path='/products/:productId/details' element={<ProductDetails />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/products/:productId/review' element={<AddReview />} />
        <Route path='/reviews/:productId' element={<ProductReviewsPage />} />

        {!contextData.isAuthenticated ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        ) : (
          <>
            <Route path='/reviews' element={<YourReviews />} />
            <Route path='/orders' element={<MyOrder />} />
            <Route path='/orders/:orderId' element={<OrderById />} />
            <Route path='/reviews/edit/:reviewId' element={<EditReview />} />
            <Route path='/logout' element={<LogoutItem />} />
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
