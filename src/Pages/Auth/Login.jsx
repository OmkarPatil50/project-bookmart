import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import './Login.css'



export function Login(){

const [email , setEmail] = useState('')
const [password , setPassword] = useState('')


    const getLoginDetails=async()=>{
try{
    const response = await fetch('/api/auth/login' ,{
        method: "POST", 
      body: JSON.stringify({
        email ,password 
      })
    })

    const jsonResponse =  await response.json()
    localStorage.setItem('encodedToken' , jsonResponse.encodedToken);
console.log(jsonResponse)
    if(jsonResponse.foundUser.email=== email){
       return <Navigate to='/'/>
    }

}catch(err){
    console.error(err)
}

    }

    return <div className="login-page">
        <div className="login-container">
   <h2>Log In</h2>
   <label htmlFor="Email-address">Email Address :</label>
   <input onChange={(event)=>setEmail(event.target.value)} type="email" placeholder="johndoe@gmail.com" />
   <label htmlFor="Password">Password :</label>
   <input onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="**********" />
   <button onClick={getLoginDetails}>Log In</button>
<Link to='/signup' className="create-account-btn">Create New Account <i className="fa-solid fa-angle-right"></i></Link>

        </div>
    </div>


}
