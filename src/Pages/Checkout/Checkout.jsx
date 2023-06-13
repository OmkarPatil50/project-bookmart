import React, { useContext } from 'react'
import './Checkout.css'
import { AppContext } from '../..'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

function Checkout() {
    const { state, dispatch } = useContext(AppContext)

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
    return (
        <div className="checkout-page">
            <div className="checkout-sub-page">
                <h1 className="checkout-page-heading">Checkout</h1>
                <div className="checkout-container">
                    <section className="address-list-checkout">
                        {state.userAddressData.map((address) => {
                            const {
                                name,
                                colony,
                                city,
                                state,
                                country,
                                postalCode,
                                mobileNumber,
                            } = address

                            return (
                                <li>
                                    <label htmlFor="address">
                                        <input
                                            type="radio"
                                            name="address"
                                            onClick={() =>
                                                dispatch({
                                                    type: 'UPDATE_DELIVERY_ADDRESS',
                                                    payload: address,
                                                })
                                            }
                                        />
                                        <div className="user-details">
                                            <h3>{name}</h3>
                                            <p>{`${colony} , ${city} ,${state} ,${country} - ${postalCode}`}</p>
                                            <p>Mobile No.: {mobileNumber}</p>
                                        </div>
                                    </label>
                                </li>
                            )
                        })}
                    </section>
                    <section className="section-pricing-checkout">
                        <section className="checkout-pricing">
                            <div className="price-details-data">
                                <div className="price-details-keys">
                                    <h3>Item</h3>
                                    <ul>
                                        {state.cartList.map(({ name }) => {
                                            return (
                                                <li className="book-data-checkout">
                                                    {name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="price-details-values">
                                    <h3>Qty</h3>
                                    <ul>
                                        {state.cartList.map(({ qty }) => {
                                            return (
                                                <li className="book-data-checkout">
                                                    {qty}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
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
                                        state.couponData.showCouponDetails ===
                                            true ? (
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
                                            {calculateDiscount(state.cartList)}
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
                                        state.couponData.showCouponDetails ===
                                            true ? (
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
                                        calculateCouponDiscount(state.cartList)}
                                </p>
                            </section>
                            <section className="delivery-address">
                                <h2 className="price-details-heading">
                                    DELIVER TO
                                </h2>
                                <h3 className="user-name-checkout">
                                    {state.deliveryAddress.name}
                                </h3>
                                <p className="user-address-checkout">{`${state.deliveryAddress.colony} , ${state.deliveryAddress.city} ,${state.deliveryAddress.state} ,${state.deliveryAddress.country} - ${state.deliveryAddress.postalCode}`}</p>
                                <p className="user-address-checkout">
                                    Mobile No.:{' '}
                                    {state.deliveryAddress.mobileNumber}
                                </p>
                            </section>
                            <Link
                                to={'/'}
                                className="btn-place-order"
                                onClick={() => {
                                    toast.success(
                                        'Order Placed Successfully!',
                                        {
                                            position: 'top-right',
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: 'light',
                                        }
                                    )
                                }}
                            >
                                Place Order
                            </Link>
                        </section>
                    </section>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Checkout
