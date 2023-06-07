import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import { v4 as uuid } from 'uuid'
import './Wishlist.css'
import { Link } from 'react-router-dom'

export const Wishlist = () => {
    const { state, dispatch } = useContext(AppContext)

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
        } catch (err) {
            console.error(err)
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
        } catch (err) {
            console.error(err)
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
        } catch (err) {
            console.error(err)
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
                                        category,
                                        img,
                                        isBestSeller,
                                        name,
                                        originalPrice,
                                        price,
                                        rating,
                                        _id,
                                    } = wishListItem
                                    return (
                                        <li className="wishlist-card" key={_id}>
                                            <Link
                                                to={`/books/${wishListItem._id}`}
                                                className="book-thumbnail-wishlist"
                                            >
                                                <img
                                                    src={img}
                                                    alt="book-thumbnail"
                                                />
                                            </Link>
                                            <Link
                                                to={`/books/${_id}`}
                                                className="book-details-wishlist"
                                            >
                                                <div className="book-subdetails-wishlist">
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
                                                </div>
                                                {state.cartList?.some(
                                                    (cartItem) =>
                                                        cartItem._id ===
                                                        wishListItem._id
                                                ) ? (
                                                    <Link to={'/cart'}>
                                                        <button className="btn-cart">
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
                                                        }}
                                                    >
                                                        Move to Cart
                                                    </button>
                                                )}
                                            </Link>
                                            <div
                                                className="btn-delete-from-wishlist"
                                                onClick={() =>
                                                    deleteFromWishlist(_id)
                                                }
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
                    <Link to="/books" className="btn-cart">
                        Let's Do Some Shopping
                    </Link>
                </div>
            )}
        </div>
    )
}
