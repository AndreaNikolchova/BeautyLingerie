import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './componets/header/Header';
import Products from './componets/product-list/ProductsList';
import Home from './componets/home/Home';
import ProductDetails from './componets/products-details/ProductsDetails';
import Cart from './componets/cart/Cart';
import Login from './componets/login/Login';
import Register from './componets/register/Register';
import { AuthContext } from './context/AuthContext';

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
          <Route path='/products' element={<Products />} />
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
