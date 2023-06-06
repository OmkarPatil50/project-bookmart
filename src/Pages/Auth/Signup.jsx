import React, { useState } from 'react'
import { Link, Navigate, json, redirect } from 'react-router-dom'
import './Signup.css'
const Signup = () => {
  
    const[userFirstName , setUserFirstName] = useState('')
    const[userLastName , setUserLastName] = useState('')
    const[userEmail , setUserEmail] = useState('')
    const[userPassword , setUserPassword] = useState('')


const signUpFunction = async()=>{
    try{

        const response = await fetch('/api/auth/signup' , { 
      method: "POST", 
      body: JSON.stringify({
        userEmail ,userPassword ,userFirstName ,userLastName
      })
        }
        )

        const jsonResponse =  await response.json()
        localStorage.setItem('encodedToken' , jsonResponse.encodedToken);

    }catch(err){
        console.error(err)
    }
}

  
    return (
    <div className='signup-page'>

      <div className="signup-container">
  <h2>Sign Up</h2>
  <div className="name-container">
<div className="first-name-box">
<label htmlFor="first-name">First Name</label>
  <input onChange={(event)=>setUserFirstName(event.target.value)} type="text"  placeholder='John'/> 
</div>
     <div className="last-name-box">
     <label htmlFor="last-name">Last Name</label>
  <input onChange={(event)=>setUserLastName(event.target.value)} type="text"   placeholder='Doe'/>
     </div>
   
  </div>
  <div className="email-password-container">

  <label htmlFor="Email">Email</label>
  <input onChange={(event)=>setUserEmail(event.target.value)} type="email" className='email-password-box' placeholder="johndoe@gmail.com" />    
  <label htmlFor="password">Password</label>
  <input onChange={(event)=>setUserPassword(event.target.value)} type="password" className='email-password-box' placeholder="**********"/> 
  </div>   
  <button onClick={signUpFunction}>Create New Account </button>
<Link to='/login' className='already-have-account-btn'>Already have an account? <i className="fa-solid fa-angle-right"></i></Link>
    

      </div>
    </div>
  )
}

export default Signup
