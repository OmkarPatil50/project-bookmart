import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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

        const jsonResponse  =  await response.json()
       console.log(JSON.stringify({
        userEmail ,userPassword ,userFirstName ,userLastName
      }))

    }catch(err){
        console.error(err)
    }
}

  
    return (
    <div>
  <h1>Sign Up</h1>
  <label htmlFor="first-name">First Name<input onChange={(event)=>setUserFirstName(event.target.value)} type="text" /></label>    
  <label htmlFor="last-name">Last Name<input onChange={(event)=>setUserLastName(event.target.value)} type="text" /></label> 
  <label htmlFor="Email">Email<input onChange={(event)=>setUserEmail(event.target.value)} type="email" /></label>    
  <label htmlFor="password">Password<input onChange={(event)=>setUserPassword(event.target.value)} type="password" /></label>    
  <button onClick={signUpFunction}>Create New Account </button>
<Link to='/login'>Already have an account? <i className="fa-solid fa-angle-right"></i></Link>
    
    </div>
  )
}

export default Signup
