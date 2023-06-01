import { useEffect } from "react";
import {Routes , Route} from 'react-router-dom'

import Mockman from 'mockman-js'
import { NavLink } from "react-router-dom";
import "./App.css";
import { Landing } from "./Pages/Landing/Landing";
import { Login } from "./Pages/Auth/Login";
import { Products } from "./Pages/Products/Products";
import { ProductDetails } from "./Pages/Products/ProductDetails";
import { Cart } from "./Pages/Cart/Cart";
import Signup from "./Pages/Auth/Signup";


function App() {





  return (
    <div className="App">

<nav>

  <div className="nav-sub-sections">



            <h2 className="main-heading">BookMart</h2>
            <label htmlFor="search-book"  className="search-input"><i className="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search for Product" /></label>
            <div className="link-items">

            <NavLink className='nav-items'>
            <i className="fa-solid fa-heart"></i></NavLink><NavLink className='nav-items'>
            <i className="fa-solid fa-cart-shopping"></i></NavLink><NavLink className='nav-items'>
            <i className="fa-solid fa-user"></i>
                    </NavLink>
            </div>
  </div>
        </nav>

    <Routes>
      <Route path='/mockman' element={<Mockman/>}/>
      <Route path= '/' element={<Landing/>}/>
      <Route path= '/login' element={<Login/>}/>
      <Route path= '/books' element={<Products/>}/>
      <Route path= '/books/:bookID' element={<ProductDetails/>}/>
      <Route path= '/cart' element={<Cart/>}/>
      <Route path= '/signup' element={<Signup/>}/>




    </Routes>
    </div>
  );
}

export default App;
