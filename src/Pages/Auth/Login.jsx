import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Login.css'
import { AppContext } from '../..'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showAddress, setShowAddress] = useState(false)
    const [showProfile, setShowProfile] = useState(true)

    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()

    const getLoginDetails = async () => {
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

            if (jsonResponse.foundUser?.email === email) {
                dispatch({ type: 'UPDATE_USER_LOGIN', payload: true })
                dispatch({
                    type: 'UPDATE_USERDATA',
                    payload: jsonResponse.foundUser,
                })
                navigate('/')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const loginWithTestCred = () => {
        setEmail('omkarp5429@gmail.com')
        setPassword('Omkar@123')
    }
    getLoginDetails()

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
                                        : 'white',
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
                                            {state.userData.firstName}{' '}
                                            {state.userData.lastName}
                                        </p>
                                        <p>{state.userData.email}</p>
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
                                    }}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
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
                        Log In With Test Credentials
                    </button>
                    <Link to="/signup" className="create-account-btn">
                        Create New Account{' '}
                        <i className="fa-solid fa-angle-right"></i>
                    </Link>
                </div>
            )}
        </div>
    )
}
