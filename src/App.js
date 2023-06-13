import { useContext } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'


import { NavLink } from "react-router-dom";
import "./App.css";
import { Landing } from "./Pages/Landing/Landing";
import { Login } from "./Pages/Auth/Login";
import { Products } from "./Pages/Products/Products";
import { ProductDetails } from "./Pages/Products/ProductDetails";
import { Cart } from "./Pages/Cart/Cart";
import Signup from "./Pages/Auth/Signup";
import { Wishlist } from "./Pages/Wishlist/Wishlist";
import RequireAuth from "./Pages/Auth/RequireAuth";
import { AppContext } from ".";
import Loader from "./Pages/Loaders/Loader";
import Checkout from "./Pages/Checkout/Checkout";
import Error from "./Pages/Error/Error";








function App() {


  const { state, dispatch } = useContext(AppContext)


  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="App">
      {
        state.isLoader ? <Loader /> : ''
      }

      <nav>

        <div className="nav-sub-sections">
          {
            location?.pathname == '/books' ? <div className="mobile-nav" onClick={() => dispatch({ type: 'UPDATE_MOBILE_FILTER' })}>
              <i id="bar" className={state.isFiltersOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} ></i>
            </div> : ''

          }


          <Link to='/' className="main-heading">Bookmart</Link>
          <label htmlFor="search-book" className="search-input"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search for Book" onChange={(event) => {
            event.target.length < 1 ? navigate(location?.state?.from?.pathname) : navigate('/books')
            dispatch({ type: 'UPDATE_FILTER_BY_NAME', payload: event.target.value })
          }} /></label>
          <div className="link-items">

            <NavLink className='nav-items' to='/wishlist' ><i className="fa-solid fa-heart"></i>{state.wishList?.length > 0 ? <p className="list-count-nav">{state.wishList?.length}</p> : ''}</NavLink>
            <NavLink className='nav-items' to='/cart' ><i className="fa-solid fa-cart-shopping"></i>{state.cartList?.length > 0 ? <p className="list-count-nav">{state.cartList?.length}</p> : ''}</NavLink>
            <NavLink className='nav-items' to='/login' ><i className="fa-solid fa-user"></i></NavLink>
          </div>
        </div>

      </nav>

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
