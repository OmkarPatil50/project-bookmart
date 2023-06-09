import React, { useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { AppContext } from '../..'

function RequireAuth({ children }) {
    const navigate = useNavigate()
    const { state } = useContext(AppContext)
    const location = useLocation()

    return (
        <div>
            {state.userLoggedIn ? (
                children
            ) : (
                <Navigate to="/login" state={{ from: location }} />
            )}
        </div>
    )
}

export default RequireAuth
