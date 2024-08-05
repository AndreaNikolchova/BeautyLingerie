import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './componets/header/Header';
import Home from './componets/home/Home';
import ProductDetails from './componets/products-details/ProductsDetails';
import Cart from './componets/cart/Cart';
import Login from './componets/login/Login';
import Register from './componets/register/Register';
import { AuthContext } from './context/AuthContext';
import ProductsByCategory from './componets/product-list/products-by-category/ProductsByCategory';
import ProductsAll from './componets/product-list/products-all/ProductsAll';
import NewestArrivals from './componets/product-list/newest-products/NewestArrivals';


function App() {
  const [authState, setAuthState] = useState({})
  const changeAuthState = (state) => {
    setAuthState(state);
  }
  const contextData = {
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,

  };

  return (
    <>
      <AuthContext.Provider value={contextData}>

        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductsAll/>} />
          <Route path='/products/bikini' element={<ProductsByCategory items='bikini'/>} />
          <Route path='/products/underwear' element={<ProductsByCategory  items='underwear'/>} />
          <Route path='/products/others' element={<ProductsByCategory  items='others'/>} />
          <Route path='/products/new-arrivals' element={<NewestArrivals  items='others'/>} />
          
          <Route path='/products/:productId/details' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
