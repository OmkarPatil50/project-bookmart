import { useEffect, useReducer } from 'react'
import { AppContext } from '..'

export function AppContextProvider({ children }) {
    const landingReducerFunction = (state, action) => {
        switch (action.type) {
            case 'UPDATE_USER_LOGIN': {
                return { ...state, userLoggedIn: action.payload }
            }

            case 'UPDATE_CATEGORIES': {
                return {
                    ...state,
                    categoriesList: action.payload,
                    filterCategories: [],
                }
            }

            case 'UPDATE_USERDATA': {
                return { ...state, userData: action.payload }
            }

            case 'UPDATE_SIGN_UP_DATA': {
                return { ...state, userSignUpData: action.payload }
            }

            case 'UPDATE_CART': {
                return { ...state, cartList: action.payload }
            }

            case 'UPDATE_WISHLIST': {
                return { ...state, wishList: action.payload }
            }

            case 'UPDATE_BOOKSLIST': {
                return {
                    ...state,
                    booksList: action.payload,
                    bookDetails: {},
                    filteredList: action.payload,
                }
            }

            case 'OPEN_BOOK': {
                return { ...state, bookDetails: action.payload }
            }

            case 'UPDATE_FILTER_PRICE': {
                return {
                    ...state,
                    filterMaxPrice: action.payload,
                }
            }

            case 'UPDATE_FILTER_CATEGORIES': {
                const updatedCategories = state.filterCategories.includes(
                    action.payload
                )
                    ? state.filterCategories.filter(
                          (item) => item !== action.payload
                      )
                    : [...state.filterCategories, action.payload]
                return {
                    ...state,
                    filterCategories: updatedCategories,
                }
            }

            case 'UPDATE_FILTER_RATINGS': {
                return {
                    ...state,
                    filterMinRating: action.payload,
                }
            }

            case 'SORT_ITEMS': {
                return {
                    ...state,
                    filterSortType: action.payload,
                }
            }

            case 'UPDATE_FILTERED_LIST': {
                return { ...state, filteredList: action.payload }
            }

            case 'RESET_FILTERS': {
                return {
                    ...state,
                    filterCategories: [],
                    filterMaxPrice: -1,
                    filterMinRating: 0,
                    filterSortType: 'none',
                }
            }

            case 'LOG_OUT': {
                return { ...state, userLoggedIn: false }
            }
            default:
                return state
        }
    }

    const initialValue = {
        booksList: [],
        categoriesList: [],
        cartList: [],
        wishList: [],
        bookDetails: {},
        filteredList: [],
        filterCategories: [],
        userData: {},
        userSignUpData: {},
        userLoggedIn: false,
        filterMaxPrice: -1,
        filterMinRating: 0,
        filterSortType: 'none',
    }

    const [state, dispatch] = useReducer(landingReducerFunction, initialValue)
    const {
        booksList,
        filterCategories,
        filterMaxPrice,
        filterMinRating,
        filterSortType,
    } = state

    useEffect(() => {
        let data = [...booksList]
        if (filterCategories.length) {
            data = data.filter((book) => {
                return filterCategories.includes(book.category)
            })
        }
        if (filterMaxPrice > 0) {
            data = data.filter((book) => {
                return book.price <= filterMaxPrice * 10
            })
        }
        if (filterMinRating > 0) {
            data = data.filter((book) => {
                return book.rating >= filterMinRating
            })
        }
        if (filterSortType !== 'none') {
            data = data.sort((a, b) => {
                return filterSortType === 'low-to-high'
                    ? a.price - b.price
                    : b.price - a.price
            })
        }

        dispatch({ type: 'UPDATE_FILTERED_LIST', payload: data })
    }, [
        booksList,
        filterCategories,
        filterMaxPrice,
        filterMinRating,
        filterSortType,
    ])
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}
