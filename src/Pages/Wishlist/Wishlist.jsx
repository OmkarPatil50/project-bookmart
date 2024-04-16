import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import './Wishlist.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WishlistCard from '../../components/WishlistCard/WishlistCard'

export const Wishlist = () => {
    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate()

    const getWishList = async () => {
        try {
            const response = await fetch(
                'https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/wishlist',
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

    const getCartData = async () => {
        try {
            const response = await fetch(
                'https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/user/cart',
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

    useEffect(() => {
        getWishList()
        getCartData()
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
                                    return (
                                        <WishlistCard
                                            wishListItem={wishListItem}
                                        />
                                    )
                                })}
                            </ul>
                        </section>
                    </div>
                </div>
            ) : (
                <div className="empty-wishlist">
                    <h1>Your Wishlist Is Empty ! ☹️</h1>
                    <Link
                        to="/books"
                        className="btn-cart"
                        onClick={() =>
                            dispatch({ type: 'UPDATE_LOADER', payload: true })
                        }
                    >
                        Let's Do Some Shopping
                    </Link>
                </div>
            )}

            <ToastContainer />
        </div>
    )
}
