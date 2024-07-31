import {Routes, Route} from 'react-router-dom';
import Header from './componets/header/Header';
import Products from './componets/list-products/ListProducts';
import Home from './componets/home/Home';
function App() {
 
  return (
    <>
      <Header/>
    <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/products' element={ <Products/>}/>
    </Routes>
      </>
  )
}

export default App
