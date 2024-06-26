import React, { useContext } from 'react'
import './Checkout.css'
import { AppContext } from '../..'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router'

function Checkout() {
    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate()

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

    const emptyCart = async (list) => {
        for (let index = 0; index < list?.length; index++) {
            const bookId = list[index].book._id
            try {
                const response = await fetch(
                    `https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart/${bookId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            authorization:
                                sessionStorage.getItem('encodedToken'),
                            'Content-type': 'application/json',
                        },
                    }
                )
                const jsonResponse = await response.json()
                dispatch({ type: 'UPDATE_CART', payload: jsonResponse.cart })
                dispatch({ type: 'UPDATE_LOADER', payload: false })
            } catch (err) {
                navigate('/error')
            }
        }
    }

    const totalAmount = (list) => {
        return calculateTotalAmount(list) - calculateCouponDiscount(list)
    }

    const placeOrderBtnHandler = () => {
        if (state.deliveryAddress === null) {
            toast.error('Please select an address for checking out!')
        } else if (state.cartList?.length === 0) {
            toast.error('Please add something to cart for checking out!')
            navigate('/cart')
        } else {
            var option = {
                key: 'rzp_test_lThdUBMK5r4gWQ',
                key_secret: 'gL1PvwFheT0DzO50YjvIbUG1',
                amount: Number(totalAmount(state.cartList)) * 100,
                currency: 'INR',
                name: 'Bookmart',
                description: 'Checkout for Merch',
                handler: function (response) {
                    toast.success(
                        'Payment successful and Order successfully placed!',
                        {
                            position: 'top-right',
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'colored',
                        }
                    )
                    dispatch({
                        type: 'UPDATE_LOADER',
                        payload: true,
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                    emptyCart(state.cartList)
                    dispatch({
                        type: 'UPDATE_COUPON_DATA',
                        payload: {
                            showCoupon: false,
                            couponDiscountName: '',
                            showCouponDetails: false,
                            couponDiscount: 0,
                        },
                    })
                },

                prefill: {
                    name: `${state.userData.firstName} ${state.userData.lastName}`,
                    email: state.userData.email,
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#3399cc',
                },
            }

            var pay = new window.Razorpay(option)
            pay.open()
        }
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
                                            className="address-input"
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
                                        {state.cartList.map(
                                            ({ book: { name } }) => {
                                                return (
                                                    <li className="book-data-checkout">
                                                        {name}
                                                    </li>
                                                )
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="price-details-values">
                                    <h3>quantity</h3>
                                    <ul>
                                        {state.cartList.map(({ quantity }) => {
                                            return (
                                                <li className="book-data-checkout">
                                                    {quantity}
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
                                    {totalAmount(state.cartList)}
                                </p>
                            </section>
                            <section className="delivery-address">
                                <h2 className="price-details-heading">
                                    DELIVER TO
                                </h2>
                                <h3 className="user-name-checkout">
                                    {state.deliveryAddress?.name}
                                </h3>
                                {state.deliveryAddress === null ? (
                                    ''
                                ) : (
                                    <p className="user-address-checkout">{`${state.deliveryAddress?.colony} , ${state.deliveryAddress?.city} ,${state.deliveryAddress?.state} ,${state.deliveryAddress?.country} - ${state.deliveryAddress?.postalCode}`}</p>
                                )}
                                {state.deliveryAddress === null ? (
                                    ''
                                ) : (
                                    <p className="user-address-checkout">
                                        Mobile No.:{' '}
                                        {state.deliveryAddress?.mobileNumber}
                                    </p>
                                )}
                            </section>
                            <button
                                className="btn-place-order"
                                onClick={placeOrderBtnHandler}
                            >
                                Place Order
                            </button>
                        </section>
                    </section>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Checkout
