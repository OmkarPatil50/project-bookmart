import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import { AppContext } from '../..'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [username, setUsername] = useState('')

    const { dispatch } = useContext(AppContext)

    const navigate = useNavigate()

    const signUpFunction = async () => {
        try {
            const response = await fetch(
                'https://bookmart.omkarpatil20.repl.co/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        password: userPassword,
                        firstName: userFirstName,
                        lastName: userLastName,
                        username,
                    }),
                }
            )

            const jsonResponse = await response.json()
            sessionStorage.setItem('encodedToken', jsonResponse.encodedToken)

            if (jsonResponse.encodedToken) {
                dispatch({ type: 'UPDATE_LOADER', payload: true })
                dispatch({
                    type: 'UPDATE_USERDATA',
                    payload: {
                        ...jsonResponse.createdUser,
                        email: jsonResponse.createdUser.userEmail,
                        firstName: jsonResponse.createdUser.userFirstName,
                        lastName: jsonResponse.createdUser.userLastName,
                    },
                })
                toast.success('Signed up Successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            } else {
                if (jsonResponse.error.includes('username')) {
                    toast.error('Username Already Exists!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    })
                } else {
                    toast.error('Email Already Exists!', {
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
            }
        } catch (err) {
            console.log(err)
            navigate('/error')
        }
    }

    const updateTestCred = () => {
        setUsername(`testusername${Date.now()}`)
        setUserEmail(`test${Date.now()}@gmail.com`)
        setUserPassword(`test${Date.now()}`)
        setUserFirstName('Test Name')
        setUserLastName('Test surname')
    }

    useEffect(() => {
        {
            dispatch({ type: 'UPDATE_LOADER', payload: false })
        }
    }, [])

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Sign Up</h2>
                <div className="name-container">
                    <div className="first-name-box">
                        <label htmlFor="first-name">First Name</label>
                        <input
                            onChange={(event) =>
                                setUserFirstName(event.target.value)
                            }
                            type="text"
                            placeholder="John"
                            value={userFirstName}
                        />
                    </div>
                    <div className="last-name-box">
                        <label htmlFor="last-name">Last Name</label>
                        <input
                            onChange={(event) =>
                                setUserLastName(event.target.value)
                            }
                            type="text"
                            placeholder="Doe"
                            value={userLastName}
                        />
                    </div>
                </div>
                <div className="email-password-container">
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        className="email-password-box"
                        placeholder="@johndoe"
                        value={username}
                    />
                    <label htmlFor="Email">Email</label>
                    <input
                        onChange={(event) => setUserEmail(event.target.value)}
                        type="email"
                        className="email-password-box"
                        placeholder="johndoe@gmail.com"
                        value={userEmail}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={(event) =>
                            setUserPassword(event.target.value)
                        }
                        type="password"
                        className="email-password-box"
                        placeholder="**********"
                        value={userPassword}
                    />
                </div>
                <button onClick={signUpFunction}>Create New Account </button>
                <button onClick={updateTestCred}>Fill Test Credentials </button>

                <Link to="/login" className="already-have-account-btn">
                    Already have an account?{' '}
                    <i className="fa-solid fa-angle-right"></i>
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup
