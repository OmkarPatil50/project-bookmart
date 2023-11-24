import { useContext } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import "./App.css";
import { Landing } from "./Pages/Landing/Landing";
import { Login } from "./Pages/Auth/Login";
import { Products } from './Pages/Products/Products.jsx';
import { ProductDetails } from "./Pages/Products/ProductDetails";
import { Cart } from "./Pages/Cart/Cart";
import Signup from "./Pages/Auth/Signup";
import { Wishlist } from "./Pages/Wishlist/Wishlist";
import RequireAuth from "./Pages/Auth/RequireAuth";
import { AppContext } from ".";
import Loader from "./Pages/Loaders/Loader";
import Checkout from "./Pages/Checkout/Checkout";
import Error from "./Pages/Error/Error";
import { Navbar } from "./components/Navbar/Navbar";
import FestivalModal from "./components/FestivalModal/FestivalModal.jsx";



function App() {


  const { state } = useContext(AppContext)
  const location = useLocation()

  return (
    <div className="App">
      {
        state.isLoader ? <Loader /> : ''
      }
      {
        state.showFestivalModal && location.pathname !== '/error' ?
          <>
            <FestivalModal />
            <div className="kite">
              <div className="tail"></div>
            </div>

            <div className="kite kite-left">
              <div className="tail"></div>
            </div>
          </> : ''

      }



      <Navbar />
      <Routes>
        <Route path='/' element={
          <Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/books' element={<Products />} />
        <Route path='/books/:bookID' element={<ProductDetails />} />
        <Route path='/cart' element={
          <RequireAuth>
            <Cart />
          </RequireAuth>
        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/wishlist' element={
          <RequireAuth>
            <Wishlist />
          </RequireAuth>
        } />
        <Route path='/checkout' element={
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        } />
        <Route path='/error' element={
          <Error />
        } />

      </Routes>

    </div>
  );
}

export default App;
