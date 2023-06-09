import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import { v4 as uuid } from 'uuid'
import './Cart.css'
import { Link } from 'react-router-dom'

export const Cart = () => {
    const { state, dispatch } = useContext(AppContext)

    const getCartData = async () => {
        try {
            const response = await fetch('/api/user/cart', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
            })
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
        } catch (err) {
            console.error(err)
        }
    }

    const deleteFromCart = async (bookId) => {
        try {
            const response = await fetch(`/api/user/cart/${bookId}`, {
                method: 'DELETE',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
            })
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
        } catch (err) {
            console.error(err)
        }
    }

    const incrementQuant = async (bookId) => {
        try {
            const response = await fetch(`api/user/cart/${bookId}`, {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
                body: JSON.stringify({
                    action: {
                        type: 'increment',
                    },
                }),
            })
            console.log(response, 'it is response')
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
        } catch (err) {
            console.error(err)
        }
    }

    const decrementQuant = async (bookId) => {
        try {
            const response = await fetch(`api/user/cart/${bookId}`, {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
                body: JSON.stringify({
                    action: {
                        type: 'decrement',
                    },
                }),
            })
            console.log(response, 'it is response')
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
        } catch (err) {
            console.error(err)
        }
    }

    const addToWishlist = async (book) => {
        try {
            const response = await fetch('/api/user/wishlist', {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('encodedToken'),
                },
                body: JSON.stringify({
                    product: book,
                }),
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
        getCartData()
    }, [])

    return (
        <div className="cart-page">
            {state.cartList?.length ? (
                <div>
                    <h1 className="cart-page-heading">
                        My Cart ({state.cartList.length})
                    </h1>
                    <div className="cart-container">
                        <section className="cart-items-list">
                            <ul>
                                {state.cartList.map((cartItem) => {
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
                                    } = cartItem
                                    return (
                                        <li className="cart-card" key={_id}>
                                            <section className="details-section-cart">
                                                <Link
                                                    to={`/books/${_id}`}
                                                    className="book-thumbnail-cart"
                                                >
                                                    <img
                                                        src={img}
                                                        alt="book-thumbnail"
                                                    />
                                                </Link>
                                                <div className="book-details-cart">
                                                    <h2 className="book-name-cart">
                                                        {name}{' '}
                                                    </h2>
                                                    <p className="author-tag-cart">
                                                        {author}
                                                    </p>
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
                                                                ((originalPrice -
                                                                    price) /
                                                                    originalPrice) *
                                                                100
                                                            ).toFixed(0)}{' '}
                                                            % OFF)
                                                        </p>
                                                    </div>
                                                    <div className="quantity-section-cart">
                                                        <button
                                                            className="decrease-quantity"
                                                            onClick={() =>
                                                                decrementQuant(
                                                                    _id
                                                                )
                                                            }
                                                            disabled={
                                                                cartItem.qty < 2
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <p className="quantity">
                                                            {cartItem.qty
                                                                ? cartItem.qty
                                                                : 1}
                                                        </p>
                                                        <button
                                                            className="increase-quantity"
                                                            onClick={() =>
                                                                incrementQuant(
                                                                    _id
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className="btn-section-cart">
                                                <button
                                                    className="btn-remove-cart"
                                                    onClick={() =>
                                                        deleteFromCart(_id)
                                                    }
                                                >
                                                    REMOVE
                                                </button>
                                                {state.wishList?.some(
                                                    (wishListItem) =>
                                                        wishListItem._id ===
                                                        cartItem._id
                                                ) ? (
                                                    <Link to={'/wishlist'}>
                                                        <button className="btn-wishlist-cart">
                                                            ALREADY IN WISHLIST
                                                        </button>
                                                    </Link>
                                                ) : (
                                                    <button
                                                        className="btn-wishlist-cart"
                                                        onClick={() => {
                                                            addToWishlist(
                                                                cartItem
                                                            )
                                                            deleteFromCart(_id)
                                                        }}
                                                    >
                                                        MOVE TO WISHLIST
                                                    </button>
                                                )}
                                            </section>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                        <section className="cart-pricing">
                            <div className="coupon-section">
                                <p className="coupon-tag-cart">
                                    <i className="fa-solid fa-tag"></i> Have A
                                    Coupon{' '}
                                </p>
                                <button className="apply-coupon">Apply</button>
                            </div>

                            <section className="price-details-section">
                                <h2 className="price-details-heading">
                                    PRICE DETAILS
                                </h2>
                                <div className="price-details-data">
                                    <div className="price-details-keys">
                                        <p>
                                            Price ({state.cartList.length}{' '}
                                            items)
                                        </p>
                                        <p>Discount</p>
                                        <p>Delivery Charges *</p>
                                        <p>Coupon Discount</p>
                                    </div>
                                    <div className="price-details-values">
                                        <p>
                                            <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                            {state.cartList.length
                                                ? state.cartList.reduce(
                                                      (acc, curr) =>
                                                          acc +
                                                          curr.originalPrice *
                                                              curr.qty,
                                                      0
                                                  )
                                                : '0'}
                                        </p>
                                        <p>
                                            <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                            {state.cartList.length
                                                ? state.cartList.reduce(
                                                      (acc, curr) =>
                                                          acc +
                                                          (curr.originalPrice -
                                                              curr.price) *
                                                              curr.qty,
                                                      0
                                                  )
                                                : '0'}
                                        </p>
                                        <p>FREE</p>
                                        <p>
                                            <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                            0.00
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section className="total-amount">
                                <p>Total Amount</p>
                                <p>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                    {(state.cartList.length
                                        ? state.cartList.reduce(
                                              (acc, curr) =>
                                                  acc + curr.price * curr.qty,
                                              0
                                          )
                                        : 0
                                    ).toFixed(2)}
                                </p>
                            </section>
                            <p className="save-tag-cart">
                                {`You will save ₹ ${
                                    state.cartList.length
                                        ? state.cartList
                                              .reduce(
                                                  (acc, curr) =>
                                                      acc +
                                                      (curr.originalPrice -
                                                          curr.price) *
                                                          curr.qty,
                                                  0
                                              )
                                              .toFixed(2)
                                        : '0'
                                } on this order`}
                            </p>
                            <div className="btn-checkout">Checkout</div>
                        </section>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <h1>Your Cart Is Empty ! ☹️</h1>
                    <Link to="/books" className="btn-cart">
                        Let's Do Some Shopping
                    </Link>
                </div>
            )}
        </div>
    )
}
