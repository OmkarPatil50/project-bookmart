import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AppContext } from '../..'
import './ProductDetails.css'
import { Link } from 'react-router-dom'
export const ProductDetails = () => {
    const { bookID } = useParams()
    const { state, dispatch } = useContext(AppContext)

    const getBookDetails = async () => {
        const response = await fetch(`/api/products/${bookID}`)
        const jsonResponse = await response.json()
        dispatch({ type: 'OPEN_BOOK', payload: jsonResponse.product })
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
        getBookDetails()
    }, [])

    const bookDetails = state.bookDetails
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
    } = bookDetails

    const navigate = useNavigate()

    return (
        <div className="product-details-page">
            <div className="product-details-card">
                <div className="product-thumbnail">
                    <img src={img} alt="books-image" className="book-image" />
                    {isBestSeller ? (
                        <p className="best-seller-tag">Best Seller</p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="book-details">
                    <h2 className="book-name">{name} </h2>
                    <p className="book-rating">
                        {rating} <i className="fa-solid fa-star"></i>
                    </p>
                    <div className="price-info-section">
                        <div className="price-section">
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
                        <p className="few-left-tag">
                            <i className="fa-sharp fa-solid fa-bolt"></i>Hurry,
                            Only Few Left !
                        </p>
                    </div>
                    <div className="book-features-section">
                        <p className="features">
                            <i className="fa-solid fa-tag"></i>Fastest Delivery
                        </p>
                        <p className="features">
                            <i className="fa-solid fa-tag"></i>Inclusive of All
                            Taxes
                        </p>
                        <p className="features">
                            <i className="fa-solid fa-tag"></i>Cash On Delivery
                            Available
                        </p>
                    </div>
                    <div className="book-attributes-section">
                        <p className="book-attributes">
                            <span className="book-attribute-heading">
                                Author :
                            </span>{' '}
                            {author}
                        </p>
                        <p className="book-attributes">
                            <span className="book-attribute-heading">
                                Category :
                            </span>{' '}
                            {category}
                        </p>
                        <p className="book-attributes">
                            <span className="book-attribute-heading">
                                Binding :
                            </span>
                            Hard Cover
                        </p>
                        <p className="book-attributes">
                            <span className="book-attribute-heading">
                                Language :
                            </span>
                            English
                        </p>
                    </div>

                    <div className="btn-section">
                        {state.cartList?.some(
                            (cartItem) => cartItem._id === bookDetails._id
                        ) ? (
                            <Link to={'/cart'}>
                                <button className="btn-cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    Go to Cart
                                </button>
                            </Link>
                        ) : (
                            <button
                                className="btn-cart"
                                onClick={() => {
                                    state.userLoggedIn
                                        ? addToCart(bookDetails)
                                        : navigate('/login')
                                }}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                                Add to Cart
                            </button>
                        )}
                        {state.wishList?.some(
                            (wishListItem) =>
                                wishListItem._id === bookDetails._id
                        ) ? (
                            <Link to={'/wishlist'}>
                                <button className="btn-wishlist">
                                    <i className="fa-regular fa-heart"></i>
                                    Go to Wishlist
                                </button>
                            </Link>
                        ) : (
                            <button
                                className="btn-wishlist"
                                onClick={() => {
                                    state.userLoggedIn
                                        ? addToWishlist(bookDetails)
                                        : navigate('/login')
                                }}
                            >
                                <i className="fa-regular fa-heart"></i>Add to
                                Wishlist
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
