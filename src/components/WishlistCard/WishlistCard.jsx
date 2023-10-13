import React, { useContext } from 'react'
import { AppContext } from '../..'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './WishlistCard.css'

const WishlistCard = ({ wishListItem }) => {
    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()

    const moveToCart = async (book) => {
        try {
            const cartResponse = await fetch(
                'https://bookmart.omkarpatil20.repl.co/user/cart',
                {
                    method: 'POST',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        bookId: book._id,
                    }),
                }
            )
            const cartJsonResponse = await cartResponse.json()
            const wishlistResponse = await fetch(
                `https://bookmart.omkarpatil20.repl.co/user/wishlist/${book._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                }
            )
            const wishlistJsonResponse = await wishlistResponse.json()
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: wishlistJsonResponse.wishlist,
            })

            dispatch({ type: 'UPDATE_CART', payload: cartJsonResponse.cart })
            toast.success('Moved to Cart!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (err) {
            navigate('/error')
        }
    }

    const deleteFromWishlist = async (bookId) => {
        try {
            const response = await fetch(
                `https://bookmart.omkarpatil20.repl.co/user/wishlist/${bookId}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                }
            )
            const jsonResponse = await response.json()
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: jsonResponse.wishlist,
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
            toast.error('Deleted From Wishlist', {
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

    const { author, img, name, originalPrice, price, _id } = wishListItem
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
                <img src={img} alt="book-thumbnail" />
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
                    <p className="book-name-wishlist">{name}</p>
                    <p className="author-tag-wishlist">{author}</p>
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
                                ((originalPrice - price) / originalPrice) *
                                100
                            ).toFixed(0)}{' '}
                            % OFF)
                        </p>
                    </div>
                </Link>
                {state.cartList?.some(
                    (cartItem) => cartItem.book._id === wishListItem._id
                ) ? (
                    <Link to={'/cart'}>
                        <button
                            className="btn-cart-in-wishlist"
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
                            moveToCart(wishListItem)

                            dispatch({
                                type: 'UPDATE_LOADER',
                                payload: true,
                            })
                            navigate('/wishlist')
                        }}
                    >
                        <i className="fa-solid fa-cart-shopping"></i> Move to
                        Cart
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
}

export default WishlistCard
