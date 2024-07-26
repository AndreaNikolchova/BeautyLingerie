import {Routes, Route} from 'react-router-dom';
import Header from './componets/Header';
import Products from './componets/Products';
import Home from './componets/Home';
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
