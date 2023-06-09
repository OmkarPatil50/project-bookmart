import { useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom'

import Mockman from 'mockman-js'
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


function App() {





  return (
    <div className="App">

      <nav>

        <div className="nav-sub-sections">



          <Link to='/' className="main-heading">Bookmart</Link>
          <label htmlFor="search-book" className="search-input"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search for Product" /></label>
          <div className="link-items">

            <NavLink className='nav-items' to='/wishlist'><i className="fa-solid fa-heart"></i></NavLink>
            <NavLink className='nav-items' to='/cart'><i className="fa-solid fa-cart-shopping"></i></NavLink>
            <NavLink className='nav-items' to='/login'><i className="fa-solid fa-user"></i></NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/mockman' element={<Mockman />} />
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





      </Routes>
    </div>
  );
}

export default App;
