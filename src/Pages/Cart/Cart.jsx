import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import { v4 as uuid } from 'uuid'
import './Cart.css'

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

    const removeFromCart = async (bookId) => {
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

    useEffect(() => {
        getCartData()
    }, [])

    return (
        <div className="cart-page">
            <h1 className="cart-page-heading">
                My Cart ({state.cartList.length})
            </h1>
            <div className="cart-container">
                <section className="cart-items-list">
                    <ul>
                        {state.cartList.map(
                            ({
                                author,
                                category,
                                img,
                                isBestSeller,
                                name,
                                originalPrice,
                                price,
                                rating,
                                _id,
                            }) => {
                                return (
                                    <li className="cart-card">
                                        <section className="details-section-cart">
                                            <section className="book-thumbnail-cart">
                                                <img
                                                    src={img}
                                                    alt="book-thumbnail"
                                                />
                                            </section>
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
                                                    <button className="decrease-quantity">
                                                        -
                                                    </button>
                                                    <p className="quantity">
                                                        5
                                                    </p>
                                                    <button className="increase-quantity">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="btn-section-cart">
                                            <button
                                                className="btn-remove-cart"
                                                onClick={() =>
                                                    removeFromCart(_id)
                                                }
                                            >
                                                REMOVE
                                            </button>
                                            <button className="btn-wishlist-cart">
                                                MOVE TO WISHLIST
                                            </button>
                                        </section>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </section>
                <section className="cart-pricing">
                    <div className="coupon-section">
                        <p className="coupon-tag-cart">
                            <i className="fa-solid fa-tag"></i> Have A Coupon{' '}
                        </p>
                        <button className="apply-coupon">Apply</button>
                    </div>

                    <section className="price-details-section">
                        <h2 className="price-details-heading">PRICE DETAILS</h2>
                        <div className="price-details-data">
                            <div className="price-details-keys">
                                <p>Price ({state.cartList.length} items)</p>
                                <p>Discount</p>
                                <p>Delivery Charges</p>
                                <p>Coupon Discount</p>
                            </div>
                            <div className="price-details-values">
                                <p>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                    123
                                </p>
                                <p>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                    123
                                </p>
                                <p>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                    123
                                </p>
                                <p>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                                    123
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="total-amount">
                        <p>Total Amount</p>
                        <p>
                            <i className="fa-solid fa-indian-rupee-sign"></i>{' '}
                            123
                        </p>
                    </section>
                    <p className="save-tag-cart">
                        You will save ₹ 180.00 on this order
                    </p>
                    <div className="btn-checkout">Checkout</div>
                </section>
            </div>
        </div>
    )
}
