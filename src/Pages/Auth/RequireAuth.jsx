import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { AppContext } from '../..'

function RequireAuth({ children }) {
    const navigate = useNavigate()
    const { state } = useContext(AppContext)

    return <div>{state.userLoggedIn ? children : <Navigate to="/login" />}</div>
}

export default RequireAuth
