import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CartCard from '../../components/CartCard/CartCard'

export const Cart = () => {
    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate()

    const getCartData = async () => {
        try {
            const response = await fetch(
                'https://bookmart.omkarpatil20.repl.co/user/cart',
                {
                    method: 'GET',
                    headers: {
                        authorization: sessionStorage.getItem('encodedToken'),
                        'Content-type': 'application/json',
                    },
                }
            )
            const jsonResponse = await response.json()
            dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (error) {
            navigate('/error')
        }
    }

    const getWishList = async () => {
        try {
            const response = await fetch(
                'https://bookmart.omkarpatil20.repl.co/user/wishlist',
                {
                    method: 'GET',
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
        } catch (error) {
            navigate('/error')
        }
    }

    const calculatePrice = (list) => {
        return list.length
            ? list.reduce(
                  (acc, curr) => acc + curr.book.originalPrice * curr.quantity,
                  0
              )
            : '0'
    }

    const calculateDiscount = (list) => {
        return list.length
            ? list.reduce(
                  (acc, curr) =>
                      acc +
                      (curr.book.originalPrice - curr.book.price) *
                          curr.quantity,
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
        getWishList()
        getCartData()
    }, [state.isLoader])

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
                                        return <CartCard cartItem={cartItem} />
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
                                            payload: 'Sankrant Special',
                                        })
                                    }}
                                />
                                50% OFF : Sankrant Special
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
