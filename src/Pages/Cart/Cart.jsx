import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../..'
import { v4 as uuid } from 'uuid'
import './Cart.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
            dispatch({ type: 'UPDATE_LOADER', payload: false })
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
            dispatch({ type: 'UPDATE_LOADER', payload: false })
            toast.error('Deleted From Cart!', {
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

            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
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
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
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
            dispatch({ type: 'UPDATE_LOADER', payload: false })
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
        } catch (err) {
            console.error(err)
        }
    }

    const calculatePrice = (list) => {
        return list.length
            ? list.reduce((acc, curr) => acc + curr.originalPrice * curr.qty, 0)
            : '0'
    }

    const calculateDiscount = (list) => {
        return list.length
            ? list.reduce(
                  (acc, curr) =>
                      acc + (curr.originalPrice - curr.price) * curr.qty,
                  0
              )
            : '0'
    }

    const calculateTotalAmount = (list) => {
        const amount = calculatePrice(list) - calculateDiscount(list)
        return amount
    }

    const calculateCouponDiscount = (list) => {
        return state.couponData.couponDiscount > 0
            ? (
                  state.couponData.couponDiscount *
                  0.01 *
                  calculateTotalAmount(list)
              ).toFixed(2)
            : 0
    }

    useEffect(() => {
        getCartData()
    }, [])

    return (
        <div className="cart-page">
            <div className="cart-sub-page">
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
                                                                ).toFixed(
                                                                    0
                                                                )}{' '}
                                                                % OFF)
                                                            </p>
                                                        </div>
                                                        <div className="quantity-section-cart">
                                                            <button
                                                                className="decrease-quantity"
                                                                onClick={() => {
                                                                    decrementQuant(
                                                                        _id
                                                                    )

                                                                    dispatch({
                                                                        type: 'UPDATE_LOADER',
                                                                        payload: true,
                                                                    })
                                                                }}
                                                                disabled={
                                                                    cartItem.qty <
                                                                    2
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
                                                                onClick={() => {
                                                                    incrementQuant(
                                                                        _id
                                                                    )
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
                                                        (wishListItem) =>
                                                            wishListItem._id ===
                                                            cartItem._id
                                                    ) ? (
                                                        <Link
                                                            to={'/wishlist'}
                                                            onClick={() =>
                                                                dispatch({
                                                                    type: 'UPDATE_LOADER',
                                                                    payload: true,
                                                                })
                                                            }
                                                        >
                                                            <button className="btn-wishlist-cart">
                                                                ALREADY IN
                                                                WISHLIST
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            className="btn-wishlist-cart"
                                                            onClick={() => {
                                                                addToWishlist(
                                                                    cartItem
                                                                )
                                                                deleteFromCart(
                                                                    _id
                                                                )
                                                                dispatch({
                                                                    type: 'UPDATE_LOADER',
                                                                    payload: true,
                                                                })
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
                                        <i className="fa-solid fa-tag"></i> Have
                                        A Coupon{' '}
                                    </p>
                                    <button
                                        className="apply-coupon"
                                        onClick={() =>
                                            dispatch({
                                                type: 'UPDATE_SHOW_COUPON',
                                                payload: true,
                                            })
                                        }
                                    >
                                        Apply
                                    </button>
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
                                            {state.couponData.couponDiscountName
                                                .length > 1 &&
                                            state.couponData
                                                .showCouponDetails === true ? (
                                                <p>
                                                    {' '}
                                                    <i className="fa-duotone fa-badge-check"></i>{' '}
                                                    {
                                                        state.couponData
                                                            .couponDiscountName
                                                    }
                                                </p>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="price-details-values">
                                            <p>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                                {calculatePrice(state.cartList)}
                                            </p>
                                            <p>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                                {calculateDiscount(
                                                    state.cartList
                                                )}
                                            </p>
                                            <p>FREE</p>
                                            <p>
                                                <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                                {calculateCouponDiscount(
                                                    state.cartList
                                                )}
                                            </p>
                                            {calculateCouponDiscount(
                                                state.cartList
                                            ) > 0 &&
                                            state.couponData
                                                .showCouponDetails === true ? (
                                                <p>
                                                    {' '}
                                                    <i
                                                        className="fa-solid fa-xmark discard-coupon"
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'UPDATE_COUPON_DISCOUNT',
                                                                payload: 0,
                                                            })
                                                            dispatch({
                                                                type: 'UPDATE_COUPON_DISCOUNT_NAME',
                                                                payload: '',
                                                            })
                                                        }}
                                                    ></i>
                                                </p>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </section>
                                <section className="total-amount">
                                    <p>Total Amount</p>
                                    <p>
                                        <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                        {calculateTotalAmount(state.cartList) -
                                            calculateCouponDiscount(
                                                state.cartList
                                            )}
                                    </p>
                                </section>
                                <p className="save-tag-cart">
                                    {`You will save ₹ ${calculateDiscount(
                                        state.cartList
                                    )} on this order`}
                                </p>
                                <Link to={'/checkout'} className="btn-checkout">
                                    Checkout
                                </Link>
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className="empty-cart">
                        <h1>Your Cart Is Empty ! ☹️</h1>
                        <Link
                            to="/books"
                            className="btn-cart"
                            onClick={() =>
                                dispatch({
                                    type: 'UPDATE_LOADER',
                                    payload: true,
                                })
                            }
                        >
                            Let's Do Some Shopping
                        </Link>
                    </div>
                )}
            </div>
            {state.couponData.showCoupon ? (
                <div className="apply-coupon-page">
                    <div className="coupon-container">
                        <div className="coupon-container-header">
                            <h2>Apply Coupon</h2>
                            <p
                                onClick={() => {
                                    dispatch({
                                        type: 'UPDATE_SHOW_COUPON',
                                        payload: false,
                                    })
                                    dispatch({
                                        type: 'UPDATE_COUPON_DISCOUNT',
                                        payload: 0,
                                    })

                                    dispatch({
                                        type: 'UPDATE_LOADER',
                                        payload: true,
                                    })
                                    setTimeout(
                                        () =>
                                            dispatch({
                                                type: 'UPDATE_LOADER',
                                                payload: false,
                                            }),
                                        1000
                                    )
                                }}
                                className="cancel-apply-coupon"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </p>
                        </div>
                        <div className="coupon-container-details">
                            <label htmlFor="coupon">
                                <input
                                    type="radio"
                                    name="coupon"
                                    onClick={() => {
                                        dispatch({
                                            type: 'UPDATE_COUPON_DISCOUNT',
                                            payload: 50,
                                        })

                                        dispatch({
                                            type: 'UPDATE_COUPON_DISCOUNT_NAME',
                                            payload: 'Diwali Dhamaka',
                                        })
                                    }}
                                />
                                50% OFF : Diwali Dhamaka
                            </label>
                            <label htmlFor="coupon">
                                <input
                                    type="radio"
                                    name="coupon"
                                    onClick={() => {
                                        dispatch({
                                            type: 'UPDATE_COUPON_DISCOUNT',
                                            payload: 10,
                                        })

                                        dispatch({
                                            type: 'UPDATE_COUPON_DISCOUNT_NAME',
                                            payload: 'New User',
                                        })
                                    }}
                                />
                                10% OFF : New User
                            </label>
                        </div>
                        <button
                            className="apply-btn"
                            onClick={() => {
                                dispatch({
                                    type: 'UPDATE_SHOW_COUPON_DETAILS',
                                    payload: true,
                                })
                                dispatch({
                                    type: 'UPDATE_SHOW_COUPON',
                                    payload: false,
                                })
                                dispatch({
                                    type: 'UPDATE_LOADER',
                                    payload: true,
                                })
                                setTimeout(
                                    () =>
                                        dispatch({
                                            type: 'UPDATE_LOADER',
                                            payload: false,
                                        }),
                                    1000
                                )
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
            <ToastContainer />
        </div>
    )
}
