import React, { useContext } from 'react'
import { AppContext } from '../..'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './BookCard.css'

const BookCard = ({ book }) => {
    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()

    const addToCart = async (book) => {
        try {
            const response = await fetch(
                'https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart',
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
            const jsonResponse = await response.json()

            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
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
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (err) {
            navigate('/error')
        }
    }

    const handleWishlistTag = (book) => {
        state.wishList?.some((wishListItem) => wishListItem._id === book._id)
            ? deleteFromWishlist(book._id)
            : addToWishlist(book)
    }

    const deleteFromWishlist = async (bookId) => {
        try {
            const response = await fetch(
                `https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/wishlist/${bookId}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                }
            )
            const jsonResponse = await response.json()
            console.log(jsonResponse, 'removed')
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

    const addToWishlist = async (book) => {
        try {
            const response = await fetch(
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
            const jsonResponse = await response.json()
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: jsonResponse.wishlist,
            })
            toast.success('Added to Wishlist!', {
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

    const {
        author,
        img,
        isBestSeller,
        name,
        originalPrice,
        price,
        rating,
        _id,
    } = book
    return (
        <div className="book-card" key={_id}>
            <div>
                <div className="book-thumbnail">
                    <Link
                        to={`/books/${_id}`}
                        onClick={() =>
                            dispatch({
                                type: 'UPDATE_LOADER',
                                payload: true,
                            })
                        }
                    >
                        <img src={img} alt="book-cover" />
                        {isBestSeller ? (
                            <p className="best-seller-tag-products">
                                Best Seller
                            </p>
                        ) : (
                            ''
                        )}
                    </Link>
                    <div
                        className="wishlist-tag"
                        onClick={() => {
                            state.userLoggedIn
                                ? handleWishlistTag(book)
                                : navigate('/login')
                            dispatch({
                                type: 'UPDATE_LOADER',
                                payload: true,
                            })
                        }}
                        style={{
                            color: state.wishList?.some(
                                (wishListItem) => wishListItem._id === book._id
                            )
                                ? 'red'
                                : 'gray',
                        }}
                    >
                        <i className="fa-solid fa-heart"></i>
                    </div>
                </div>
                <Link
                    to={`/books/${_id}`}
                    className="name-rating-section"
                    onClick={() =>
                        dispatch({
                            type: 'UPDATE_LOADER',
                            payload: true,
                        })
                    }
                >
                    <div className="name-author-section">
                        <h2 className="book-name-products">{name} </h2>
                        <p className="author-tag">{author}</p>
                    </div>
                    <p className="rating-tag">
                        {rating}
                        <i className="fa-solid fa-star"></i>{' '}
                    </p>
                </Link>

                <Link
                    to={`/books/${_id}`}
                    className="price-section-products"
                    onClick={() =>
                        dispatch({
                            type: 'UPDATE_LOADER',
                            payload: true,
                        })
                    }
                >
                    <p className="book-price">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {price}
                    </p>
                    <p className="book-original-price">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {originalPrice}
                    </p>
                    <p className="book-discount-products">
                        (
                        {(
                            ((originalPrice - price) / originalPrice) *
                            100
                        ).toFixed(0)}{' '}
                        % OFF)
                    </p>
                </Link>
            </div>
            {state.cartList?.some(
                (cartItem) => cartItem.book._id === book._id
            ) ? (
                <Link to={'/cart'}>
                    <button
                        className="btn-cart-products"
                        onClick={() =>
                            dispatch({
                                type: 'UPDATE_LOADER',
                                payload: true,
                            })
                        }
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        Go to Cart
                    </button>
                </Link>
            ) : (
                <button
                    className="btn-cart-products"
                    onClick={() => {
                        state.userLoggedIn
                            ? addToCart(book)
                            : navigate('/login')
                        dispatch({
                            type: 'UPDATE_LOADER',
                            payload: true,
                        })
                    }}
                >
                    <i className="fa-solid fa-cart-shopping"></i>
                    Add to Cart
                </button>
            )}
        </div>
    )
}

export default BookCard
