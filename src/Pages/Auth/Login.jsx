import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './Login.css'
import { AppContext } from '../..'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAddress, setShowAddress] = useState(false)
    const [showProfile, setShowProfile] = useState(true)

    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()
    const location = useLocation()
    const getLoginDetails = async () => {
        dispatch({ type: 'UPDATE_LOADER', payload: true })
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const jsonResponse = await response.json()
            localStorage.setItem('encodedToken', jsonResponse.encodedToken)

            if (jsonResponse.encodedToken) {
                dispatch({ type: 'UPDATE_USER_LOGIN', payload: true })
                dispatch({
                    type: 'UPDATE_USERDATA',
                    payload: jsonResponse.foundUser,
                })
                navigate(location?.state?.from?.pathname)
                dispatch({ type: 'UPDATE_LOADER', payload: false })
                toast.success('Logged in Successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const loginWithTestCred = () => {
        setEmail('omkarp5429@gmail.com')
        setPassword('Omkar@123')
    }

    setTimeout(
        () =>
            dispatch({
                type: 'UPDATE_LOADER',
                payload: false,
            }),
        1000
    )

    return (
        <div className="login-page">
            {state.userLoggedIn ? (
                <div className="login-container">
                    <h2 className="login-container-heading">Account</h2>
                    <div className="account-container">
                        <div className="account-header-section">
                            <p
                                className="account-header-nav"
                                style={{
                                    backgroundColor: showProfile
                                        ? '#007bb5'
                                        : 'white',
                                    color: showProfile ? 'white' : 'black',
                                }}
                                onClick={() => {
                                    setShowProfile(!showProfile)
                                    setShowAddress(!showAddress)
                                }}
                            >
                                Profile
                            </p>
                            <p
                                className="account-header-nav"
                                style={{
                                    backgroundColor: showAddress
                                        ? '#007bb5'
                                        : '#f8f8f8',
                                    color: showAddress ? 'white' : 'black',
                                }}
                                onClick={() => {
                                    setShowProfile(!showProfile)
                                    setShowAddress(!showAddress)
                                }}
                            >
                                Address
                            </p>
                        </div>
                        {showProfile ? (
                            <div className="profile-container">
                                <h2 className="login-profile-container-heading">
                                    Profile Details
                                </h2>
                                <div className="profile-details">
                                    <div className="profile-keys">
                                        <p>Full Name :</p>
                                        <p>Email :</p>
                                    </div>
                                    <div className="profile-value">
                                        <p>
                                            {state.userData.firstName
                                                ? state.userData.firstName
                                                : state.userData
                                                      .userFirstName}{' '}
                                            {state.userData.lastName
                                                ? state.userData.lastName
                                                : state.userData.userLastName}
                                        </p>
                                        <p>
                                            {state.userData.email
                                                ? state.userData.email
                                                : state.userData.userEmail}
                                        </p>
                                    </div>
                                </div>
                                <h2 className="login-profile-container-heading">
                                    Account Settings
                                </h2>
                                <button
                                    className="btn-log-out"
                                    onClick={() => {
                                        dispatch({ type: 'LOG_OUT' })

                                        navigate('/')
                                        toast.warn('Logged Out Successfully!', {
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
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <div className="login-container">
                    <h2 className="login-container-heading">Log In</h2>
                    <label htmlFor="Email-address">Email Address :</label>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        placeholder="johndoe@gmail.com"
                        value={email}
                    />
                    <label htmlFor="Password">Password :</label>
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="**********"
                        value={password}
                    />
                    <button onClick={getLoginDetails} className="btn-log-in">
                        Log In
                    </button>
                    <button onClick={loginWithTestCred} className="btn-log-in">
                        Fill Test Credentials
                    </button>
                    <Link to="/signup" className="create-account-btn">
                        Create New Account{' '}
                        <i className="fa-solid fa-angle-right"></i>
                    </Link>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}
