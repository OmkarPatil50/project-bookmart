import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, json, redirect, useNavigate } from 'react-router-dom'
import './Signup.css'
import { AppContext } from '../..'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const { state, dispatch } = useContext(AppContext)

    const navigate = useNavigate()

    const signUpFunction = async () => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    userEmail,
                    userPassword,
                    userFirstName,
                    userLastName,
                }),
            })

            const jsonResponse = await response.json()
            localStorage.setItem('encodedToken', jsonResponse.encodedToken)

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
                setTimeout(() => {
                    navigate('/')
                }, 2000)
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
        } catch (err) {
            console.error(err)
        }
    }

    const updateTestCred = () => {
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
