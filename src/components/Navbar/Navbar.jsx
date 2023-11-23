import { useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../..'
import './Navbar.css'

export const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { state, dispatch } = useContext(AppContext)

    return (
        <nav>
            <div className="nav-sub-sections">
                {location?.pathname === '/books' ? (
                    <div
                        className="mobile-nav"
                        onClick={() =>
                            dispatch({ type: 'UPDATE_MOBILE_FILTER' })
                        }
                    >
                        <i
                            id="bar"
                            className={
                                state.isFiltersOpen
                                    ? 'fa-solid fa-xmark'
                                    : 'fa-solid fa-bars'
                            }
                        ></i>
                    </div>
                ) : (
                    ''
                )}

                <Link to="/" className="main-heading">
                    <p>
                        <div className="kite-emoji">🪁</div> Bookmart
                    </p>
                </Link>
                <label htmlFor="search-book" className="search-input">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search for Book"
                        onChange={(event) => {
                            event.target.length < 1
                                ? navigate(location?.state?.from?.pathname)
                                : navigate('/books')
                            dispatch({
                                type: 'UPDATE_FILTER_BY_NAME',
                                payload: event.target.value,
                            })
                        }}
                    />
                </label>
                <div className="link-items">
                    <NavLink className="nav-items" to="/wishlist">
                        <i className="fa-solid fa-heart"></i>
                        {state.wishList?.length > 0 && state.userLoggedIn ? (
                            <p className="list-count-nav">
                                {state.wishList?.length}
                            </p>
                        ) : (
                            ''
                        )}
                    </NavLink>
                    <NavLink className="nav-items" to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {state.cartList?.length > 0 && state.userLoggedIn ? (
                            <p className="list-count-nav">
                                {state.cartList?.length}
                            </p>
                        ) : (
                            ''
                        )}
                    </NavLink>
                    <NavLink className="nav-items" to="/login">
                        <i className="fa-solid fa-user"></i>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
