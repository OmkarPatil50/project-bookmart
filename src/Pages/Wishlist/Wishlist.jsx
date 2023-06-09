import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import './Wishlist.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Wishlist = () => {
    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate()

    const getWishlistData = async () => {
        try {
            const response = await fetch('/api/user/wishlist', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
            })
            const jsonResponse = await response.json()
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: jsonResponse.wishlist,
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (err) {
            navigate('/error')
        }
    }

    const addToCart = async (book) => {
        try {
            const response = await fetch('/api/user/cart', {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
                body: JSON.stringify({
                    product: book,
                }),
            })
            const jsonResponse = await response.json()

            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
            toast.success('Added to Cart!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        } catch (err) {
            navigate('/error')
        }
    }

    const deleteFromWishlist = async (bookId) => {
        try {
            const response = await fetch(`/api/user/wishlist/${bookId}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
            })
            const jsonResponse = await response.json()
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: jsonResponse.wishlist,
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
            toast.error('Deleted From Wishlist!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        } catch (err) {
            navigate('/error')
        }
    }

    useEffect(() => {
        getWishlistData()
    }, [])

    return (
        <div className="wishlist-page">
            {state.wishList?.length ? (
                <div>
                    <h1 className="wishlist-page-heading">
                        My Wishlist ({state.wishList.length})
                    </h1>
                    <div className="wishlist-container">
                        <section className="wishlist-items-list">
                            <ul>
                                {state.wishList.map((wishListItem) => {
                                    const {
                                        author,
                                        img,
                                        name,
                                        originalPrice,
                                        price,
                                        _id,
                                    } = wishListItem
                                    return (
                                        <li className="wishlist-card" key={_id}>
                                            <Link
                                                to={`/books/${wishListItem._id}`}
                                                className="book-thumbnail-wishlist"
                                                onClick={() =>
                                                    dispatch({
                                                        type: 'UPDATE_LOADER',
                                                        payload: true,
                                                    })
                                                }
                                            >
                                                <img
                                                    src={img}
                                                    alt="book-thumbnail"
                                                />
                                            </Link>
                                            <div
                                                className="book-details-wishlist"
                                                onClick={() =>
                                                    dispatch({
                                                        type: 'UPDATE_LOADER',
                                                        payload: true,
                                                    })
                                                }
                                            >
                                                <Link
                                                    to={`/books/${wishListItem._id}`}
                                                    className="book-subdetails-wishlist"
                                                >
                                                    <p className="book-name-wishlist">
                                                        {name}
                                                    </p>
                                                    <p className="author-tag-wishlist">
                                                        {author}
                                                    </p>
                                                    <div className="price-section-wishlist">
                                                        <p className="book-price">
                                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                                            {price}
                                                        </p>
                                                        <p className="book-original-price">
                                                            <i className="fa-solid fa-indian-rupee-sign"></i>
                                                            {originalPrice}
                                                        </p>
                                                        <p className="book-discount">
                                                            (
                                                            {(
                                                                ((originalPrice -
                                                                    price) /
                                                                    originalPrice) *
                                                                100
                                                            ).toFixed(0)}{' '}
                                                            % OFF)
                                                        </p>
                                                    </div>
                                                </Link>
                                                {state.cartList?.some(
                                                    (cartItem) =>
                                                        cartItem._id ===
                                                        wishListItem._id
                                                ) ? (
                                                    <Link to={'/cart'}>
                                                        <button
                                                            className="btn-cart"
                                                            onClick={() =>
                                                                dispatch({
                                                                    type: 'UPDATE_LOADER',
                                                                    payload: true,
                                                                })
                                                            }
                                                        >
                                                            <i className="fa-solid fa-cart-shopping"></i>
                                                            Already in Cart
                                                        </button>
                                                    </Link>
                                                ) : (
                                                    <button
                                                        className="btn-cart-in-wishlist"
                                                        onClick={() => {
                                                            addToCart(
                                                                wishListItem
                                                            )
                                                            deleteFromWishlist(
                                                                _id
                                                            )
                                                            dispatch({
                                                                type: 'UPDATE_LOADER',
                                                                payload: true,
                                                            })
                                                            navigate(
                                                                '/wishlist'
                                                            )
                                                        }}
                                                    >
                                                        Move to Cart
                                                    </button>
                                                )}
                                            </div>
                                            <div
                                                className="btn-delete-from-wishlist"
                                                onClick={() => {
                                                    deleteFromWishlist(_id)
                                                    dispatch({
                                                        type: 'UPDATE_LOADER',
                                                        payload: true,
                                                    })
                                                }}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    </div>
                </div>
            ) : (
                <div className="empty-wishlist">
                    <h1>Your Wishlist Is Empty ! ☹️</h1>
                    <Link
                        to="/books"
                        className="btn-cart"
                        onClick={() =>
                            dispatch({ type: 'UPDATE_LOADER', payload: true })
                        }
                    >
                        Let's Do Some Shopping
                    </Link>
                </div>
            )}

            <ToastContainer />
        </div>
    )
}
