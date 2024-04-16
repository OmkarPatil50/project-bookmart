import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../..'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CartCard.css'

const CartCard = ({ cartItem }) => {
    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()

    const incrementQuant = async (bookId) => {
        try {
            const response = await fetch(
                `https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart/${bookId}`,
                {
                    method: 'POST',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: {
                            type: 'increment',
                        },
                    }),
                }
            )

            const jsonResponse = await response.json()
            console.log(jsonResponse, 'increment')
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (err) {
            navigate('/error')
        }
    }

    const decrementQuant = async (bookId) => {
        try {
            const response = await fetch(
                `https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart/${bookId}`,
                {
                    method: 'POST',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: {
                            type: 'decrement',
                        },
                    }),
                }
            )
            const jsonResponse = await response.json()
            console.log(jsonResponse, 'decrement')
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (err) {
            navigate('/error')
        }
    }

    const moveToWishlist = async (book) => {
        try {
            const cartResponse = await fetch(
                `https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart/${book._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                }
            )

            const cartJsonResponse = await cartResponse.json()

            const wishlistResponse = await fetch(
                'https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/wishlist',
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
            const wishlistJsonResponse = await wishlistResponse.json()

            dispatch({
                type: 'UPDATE_CART',
                payload: cartJsonResponse.cart,
            })
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: wishlistJsonResponse.wishlist,
            })

            toast.success('Moved to Wishlist!', {
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

    const deleteFromCart = async (bookId) => {
        try {
            const response = await fetch(
                `https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart/${bookId}`,
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
                type: 'UPDATE_CART',
                payload: jsonResponse.cart,
            })
            toast.error('Deleted From Cart', {
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

    const { author, img, name, originalPrice, price, _id } = cartItem.book
    return (
        <li className="cart-card" key={_id}>
            <section className="details-section-cart">
                <Link
                    to={`/books/${_id}`}
                    className="book-thumbnail-cart"
                    onClick={() =>
                        dispatch({
                            type: 'UPDATE_LOADER',
                            payload: true,
                        })
                    }
                >
                    <img src={img} alt="book-thumbnail" />
                </Link>
                <div className="book-details-cart">
                    <h2 className="book-name-cart">{name} </h2>
                    <p className="author-tag-cart">{author}</p>
                    <div className="price-section-cart">
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
                    <div className="quantity-section-cart">
                        <button
                            className="decrease-quantity"
                            onClick={() => {
                                decrementQuant(_id)

                                dispatch({
                                    type: 'UPDATE_LOADER',
                                    payload: true,
                                })
                            }}
                            disabled={cartItem.quantity < 2}
                        >
                            -
                        </button>
                        <p className="quantity">
                            {cartItem.quantity ? cartItem.quantity : 1}
                        </p>
                        <button
                            className="increase-quantity"
                            onClick={() => {
                                incrementQuant(_id)
                                dispatch({
                                    type: 'UPDATE_LOADER',
                                    payload: true,
                                })
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </section>
            <section className="btn-section-cart">
                <button
                    className="btn-remove-cart"
                    onClick={() => {
                        deleteFromCart(_id)
                        dispatch({
                            type: 'UPDATE_LOADER',
                            payload: true,
                        })
                    }}
                >
                    REMOVE
                </button>
                {state.wishList?.some(
                    (wishListItem) => wishListItem._id === cartItem.book._id
                ) ? (
                    <button className="btn-wishlist-cart" disabled>
                        <Link
                            to={'/wishlist'}
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_LOADER',
                                    payload: true,
                                })
                            }
                            className="link"
                        >
                            ALREADY IN WISHLIST
                        </Link>
                    </button>
                ) : (
                    <button
                        className="btn-wishlist-cart"
                        onClick={() => {
                            dispatch({
                                type: 'UPDATE_LOADER',
                                payload: true,
                            })
                            moveToWishlist(cartItem.book)
                        }}
                    >
                        MOVE TO WISHLIST
                    </button>
                )}
            </section>
        </li>
    )
}

export default CartCard
