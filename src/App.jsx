import {Routes, Route} from 'react-router-dom';
import Header from './componets/header/Header';
import Products from './componets/product-list/ProductsList';
import Home from './componets/home/Home';
import ProductDetails from './componets/products-details/ProductsDetails';
import Cart from './componets/cart/Cart';

function App() {
 
  return (
    <>
      <Header/>
    <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/products' element={ <Products/>}/>
      <Route path='/products/:productId/details' element={<ProductDetails/>}/>
      <Route path='/cart' element={ <Cart/>}/>
    </Routes>
      </>
  )
}

export default App
