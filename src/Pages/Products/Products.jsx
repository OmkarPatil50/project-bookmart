import { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import { useNavigate } from 'react-router-dom'
import './Products.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FilterBar from '../../components/FilterBar/FilterBar'
import BookCard from '../../components/BookCard/BookCard'

export const Products = () => {
    const { state, dispatch } = useContext(AppContext)

    const getBooksList = async () => {
        try {
            const response = await fetch(
                'https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/books'
            )
            const jsonResponse = await response.json()
            dispatch({
                type: 'UPDATE_BOOKSLIST',
                payload: jsonResponse.books,
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (error) {
            navigate('/error')
        }
    }

    const getCartList = async () => {
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
            console.log(jsonResponse, 'wishlist fetched')
            dispatch({
                type: 'UPDATE_WISHLIST',
                payload: jsonResponse.wishlist,
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (error) {
            navigate('/error')
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        getBooksList()
    }, [])

    useEffect(() => {
        getCartList()
        getWishList()
    }, [state.isLoader])

    return (
        <div className="books-page">
            <FilterBar />
            <div className="section-books">
                <h2 className="section-books-heading">
                    Showing All Books{' '}
                    <span className="book-count">{`   (${state.filteredList?.length} Books)`}</span>
                </h2>
                <ul>
                    {state.filteredList?.map((book) => {
                        return <BookCard book={book} />
                    })}
                </ul>
            </div>
            <ToastContainer />
        </div>
    )
}
