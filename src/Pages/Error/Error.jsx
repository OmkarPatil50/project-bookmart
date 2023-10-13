import React, { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import './Error.css'

function Error() {
    const { dispatch } = useContext(AppContext)

    useEffect(() => {
        dispatch({ type: 'UPDATE_LOADER', payload: false })
    }, [])
    return (
        <div className="error-page">
            <h1>It's not you, It's us..!</h1>
            <h3>
                If Problem Persists Start Server{' '}
                <a
                    href="https://replit.com/@OmkarPatil20/Bookmart"
                    className="link"
                >
                    Here
                </a>
            </h3>
            <div className="error-img"></div>
        </div>
    )
}

export default Error
