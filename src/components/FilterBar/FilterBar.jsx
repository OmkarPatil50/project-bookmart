import React, { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import './FilterBar.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const FilterBar = () => {
    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate()

    const getLandingData = async () => {
        try {
            const response = await fetch(
                'https://d72bcbda-3fcd-4a58-97db-df57aa22ebf2-00-16xr05kv9803e.janeway.replit.dev/categories'
            )
            const jsonResponse = await response.json()
            dispatch({
                type: 'UPDATE_CATEGORIES',
                payload: jsonResponse.categories,
            })
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        } catch (error) {
            navigate('/error')
        }
    }

    useEffect(() => {
        getLandingData()
    }, [])

    return (
        <div
            className="section-filters"
            style={{
                transform: state.isFiltersOpen ? 'translateX(0px)' : '',
            }}
        >
            <div className="filter-keys">
                <h3>Filters</h3>
                <h3
                    onClick={() => {
                        dispatch({ type: 'RESET_FILTERS' })
                        toast.success('Cleared Filters!', {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        })
                    }}
                >
                    Clear
                </h3>
            </div>
            <div className="filter-by-price">
                <label htmlFor="filter-by-price">
                    Price <span>(Not more than)</span>
                </label>
                <div className="range">
                    <p>
                        <i className="fa-solid fa-indian-rupee-sign"></i> 100
                    </p>
                    <p>
                        <i className="fa-solid fa-indian-rupee-sign"></i> 500
                    </p>
                    <p>
                        <i className="fa-solid fa-indian-rupee-sign"></i> 1000
                    </p>
                </div>
                <input
                    type="range"
                    name="price"
                    value={state.filterMaxPrice > 0 ? state.filterMaxPrice : 50}
                    min={10}
                    step={10}
                    onChange={(event) =>
                        dispatch({
                            type: 'UPDATE_FILTER_PRICE',
                            payload: event.target.value,
                        })
                    }
                />
            </div>
            <div className="filter-by-category">
                <h3>Category</h3>
                {state.categoriesList.map((category) => {
                    return (
                        <label
                            htmlFor={category.categoryName}
                            key={category.categoryName}
                        >
                            {' '}
                            <input
                                type="checkbox"
                                onChange={() =>
                                    dispatch({
                                        type: 'UPDATE_FILTER_CATEGORIES',
                                        payload: category.categoryName,
                                    })
                                }
                                name="category"
                                checked={state.filterCategories.includes(
                                    category.categoryName
                                )}
                            />{' '}
                            {category.categoryName}
                        </label>
                    )
                })}
            </div>

            <div className="filter-by-rating">
                <h3>Rating</h3>
                <label htmlFor="rating-above-one">
                    {' '}
                    <input
                        type="radio"
                        name="rating"
                        value={1}
                        onChange={(event) =>
                            dispatch({
                                type: 'UPDATE_FILTER_RATINGS',
                                payload: event.target.value,
                            })
                        }
                        checked={state.filterMinRating === '1'}
                    />
                    1 Stars & above
                </label>
                <label htmlFor="rating-above-two">
                    {' '}
                    <input
                        type="radio"
                        name="rating"
                        value={2}
                        onChange={(event) =>
                            dispatch({
                                type: 'UPDATE_FILTER_RATINGS',
                                payload: event.target.value,
                            })
                        }
                        checked={state.filterMinRating === '2'}
                    />
                    2 Stars & above
                </label>
                <label htmlFor="rating-above-three">
                    {' '}
                    <input
                        type="radio"
                        name="rating"
                        value={3}
                        onChange={(event) =>
                            dispatch({
                                type: 'UPDATE_FILTER_RATINGS',
                                payload: event.target.value,
                            })
                        }
                        checked={state.filterMinRating === '3'}
                    />
                    3 Stars & above
                </label>
                <label htmlFor="rating-above-four">
                    {' '}
                    <input
                        type="radio"
                        name="rating"
                        value={4}
                        onChange={(event) =>
                            dispatch({
                                type: 'UPDATE_FILTER_RATINGS',
                                payload: event.target.value,
                            })
                        }
                        checked={state.filterMinRating === '4'}
                    />
                    4 Stars & above
                </label>
            </div>

            <div className="sort">
                <h3>Sort by</h3>

                <label htmlFor="sort-low-to-high">
                    <input
                        type="radio"
                        name="sort"
                        checked={state.filterSortType === 'low-to-high'}
                        onChange={() =>
                            dispatch({
                                type: 'SORT_ITEMS',
                                payload: 'low-to-high',
                            })
                        }
                    />
                    Price - Low to High
                </label>

                <label htmlFor="sort-high-to-low">
                    <input
                        type="radio"
                        name="sort"
                        checked={state.filterSortType === 'high-to-low'}
                        onChange={() =>
                            dispatch({
                                type: 'SORT_ITEMS',
                                payload: 'high-to-low',
                            })
                        }
                    />
                    Price - High to Low
                </label>
            </div>
        </div>
    )
}

export default FilterBar
