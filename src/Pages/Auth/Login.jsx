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
    const [showAddressAdditionPage, setShowAddressAdditionPage] =
        useState(false)

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
            } else {
                toast.error('Invalid Login Credentials!', {
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
                                        : '#f8f8f8',
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
                                        <p>Name :</p>
                                        <p>Email :</p>
                                    </div>
                                    <div className="profile-value">
                                        <p>
                                            {state.userData.firstName}
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
                                        toast.error(
                                            'Logged Out Successfully!',
                                            {
                                                position: 'top-right',
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: 'light',
                                            }
                                        )
                                    }}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                        {showAddressAdditionPage ? (
                            <div className="address-profile-page">
                                <div className="address-profile-container">
                                    <h2 className="login-profile-container-heading">
                                        ADD NEW ADDRESS
                                    </h2>
                                    <label htmlFor="name">
                                        <input
                                            type="text"
                                            value={state.newAddress.name}
                                            placeholder="Enter Name"
                                            required
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_NAME',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label htmlFor="colony">
                                        <input
                                            type="text"
                                            value={state.newAddress.colony}
                                            required
                                            placeholder="Enter House No., Road, Colony Name"
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_COLONY',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label htmlFor="city">
                                        <input
                                            type="text"
                                            required
                                            value={state.newAddress.city}
                                            placeholder="Enter City"
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_CITY',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label htmlFor="state">
                                        <input
                                            type="text"
                                            required
                                            value={state.newAddress.state}
                                            placeholder="Enter State"
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_STATE',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label htmlFor="country">
                                        <input
                                            type="text"
                                            required
                                            value={state.newAddress.country}
                                            placeholder="Enter Country"
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_COUNTRY',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label htmlFor="postal-code">
                                        <input
                                            type="number"
                                            required
                                            value={state.newAddress.postalCode}
                                            placeholder="Enter Postal Code"
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_POSTAL_CODE',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label htmlFor="mobile-number">
                                        <input
                                            type="number"
                                            required
                                            value={
                                                state.newAddress.mobileNumber
                                            }
                                            placeholder="Enter Mobile Number"
                                            onChange={(event) =>
                                                dispatch({
                                                    type: 'UPDATE_MOB_NO',
                                                    payload: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <section className="btn-section-address">
                                        <button
                                            type="submit"
                                            onClick={() => {
                                                if (
                                                    (state.newAddress.name,
                                                    state.newAddress.colony,
                                                    state.newAddress.city,
                                                    state.newAddress.state,
                                                    state.newAddress.country,
                                                    state.newAddress.postalCode,
                                                    state.newAddress
                                                        .mobileNumber)
                                                ) {
                                                    dispatch({
                                                        type: 'ADD_NEW_ADDRESS',
                                                        payload:
                                                            state.newAddress,
                                                    })
                                                    dispatch({
                                                        type: 'UPDATE_NEW_ADDRESS',
                                                        payload: {
                                                            name: '',
                                                            colony: '',
                                                            city: '',
                                                            state: '',
                                                            country: '',
                                                            postalCode: '',
                                                            mobileNumber: '',
                                                        },
                                                    })
                                                    toast.success(
                                                        'Address Added Successfully!',
                                                        {
                                                            position:
                                                                'top-right',
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: 'light',
                                                        }
                                                    )
                                                    setShowAddressAdditionPage(
                                                        false
                                                    )
                                                }
                                            }}
                                            className="btn-save"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                dispatch({
                                                    type: 'UPDATE_NEW_ADDRESS',
                                                    payload: {
                                                        name: '',
                                                        colony: '',
                                                        city: '',
                                                        state: '',
                                                        country: '',
                                                        postalCode: '',
                                                        mobileNumber: '',
                                                    },
                                                })

                                                setShowAddressAdditionPage(
                                                    false
                                                )
                                            }}
                                            className="btn-cancel"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'UPDATE_NEW_ADDRESS',
                                                    payload: {
                                                        name: 'Admin',
                                                        colony: '123 , Candolim beach road',
                                                        city: 'Panjim',
                                                        state: 'Goa',
                                                        country: 'India',
                                                        postalCode: '566987',
                                                        mobileNumber:
                                                            '4567891230',
                                                    },
                                                })
                                            }
                                            className="btn-dummy-address"
                                        >
                                            Fill with Dummy Address
                                        </button>
                                    </section>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        {showAddress ? (
                            <div className="profile-container">
                                <h2 className="login-profile-container-heading">
                                    My Addresses
                                </h2>
                                <div className="profile-details">
                                    <ul className="address-list">
                                        {state.userAddressData?.map(
                                            (address) => {
                                                const {
                                                    name,
                                                    colony,
                                                    city,
                                                    state,
                                                    country,
                                                    postalCode,
                                                    mobileNumber,
                                                } = address

                                                return (
                                                    <li className="address-list-item">
                                                        <h2 className="address-user-name">
                                                            {name}
                                                        </h2>
                                                        <p className="user-address">
                                                            {`${colony} , ${city} , ${state} , ${country} - ${postalCode}`}
                                                        </p>
                                                        <p className="address-user-mob">
                                                            Phone No.{' '}
                                                            {mobileNumber}
                                                        </p>
                                                        <button
                                                            className="btn-edit"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'UPDATE_ADDRESS_DATA',
                                                                    payload: {
                                                                        name,
                                                                        colony,
                                                                        city,
                                                                        state,
                                                                        country,
                                                                        postalCode,
                                                                        mobileNumber,
                                                                    },
                                                                })

                                                                setShowAddressAdditionPage(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn-remove"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: 'DELETE_ADDRESS',
                                                                    payload:
                                                                        address,
                                                                })
                                                                toast.error(
                                                                    'Deleted Address!',
                                                                    {
                                                                        position:
                                                                            'top-right',
                                                                        autoClose: 5000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress:
                                                                            undefined,
                                                                        theme: 'light',
                                                                    }
                                                                )
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                )
                                            }
                                        )}
                                    </ul>
                                </div>
                                <button
                                    className="btn-add-new-address"
                                    onClick={() =>
                                        setShowAddressAdditionPage(true)
                                    }
                                >
                                    {' '}
                                    + Add New Address
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
