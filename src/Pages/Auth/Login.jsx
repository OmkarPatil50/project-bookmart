import { useEffect } from "react"
import { Link } from "react-router-dom"

export function Login(){



    const getLoginDetails=async()=>{

    }

useEffect(()=>{
    getLoginDetails()
},[])

    return <div className="login-page">
   <h2>Log In</h2>
   <label htmlFor="Email-address">Email Address <input type="email" /></label>
   <label htmlFor="Password">Password <input type="password" /></label>
   <button>Log In</button>
<Link to='/signup'>Create New Account <i className="fa-solid fa-angle-right"></i></Link>
    </div>


}
