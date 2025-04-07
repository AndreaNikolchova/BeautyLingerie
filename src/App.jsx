import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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

function App() {
  const savedAuthState = JSON.parse(sessionStorage.getItem('authState')) || {};
  const [authState, setAuthState] = useState(savedAuthState);

  const changeAuthState = (state) => {
    setAuthState(state);
    sessionStorage.setItem('authState', JSON.stringify(state));
  };

  const contextData = {
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    isAdmin: authState.isAdmin,
    changeAuthState,
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
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/products/:productId/review' element={<AddReview/>}/>
        <Route path='/reviews/:productId' element={<ProductReviewsPage/>}/>
       
        {!contextData.isAuthenticated ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        ) : (
        
          <Route path='/login' element={<Navigate to="/" />} />
        )}

       
        {contextData.isAuthenticated && <Route path='/logout' element={<LogoutItem />} />}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
