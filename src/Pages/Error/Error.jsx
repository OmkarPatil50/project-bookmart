import React, { useContext, useEffect } from 'react'
import { AppContext } from '../..'
import './Error.css'

function Error() {
    const { state, dispatch } = useContext(AppContext)

    useEffect(() => {
        dispatch({ type: 'UPDATE_LOADER', payload: false })
    })
    return (
        <div className="error-page">
            <h1>It's not you, It's us..!</h1>
            <div className="error-img"></div>
        </div>
    )
}

export default Error
