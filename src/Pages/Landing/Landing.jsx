import { useContext, useEffect } from "react"
import { AppContext } from "../.."
import './Landing.css'
import { Link } from "react-router-dom"

export function Landing(){

const {state , dispatch} = useContext(AppContext)

    const getLandingData = async()=>{

try{

const response = await fetch('/api/categories')
const jsonResponse = await response.json()
dispatch({type:'UPDATE_CATEGORIES' , payload:jsonResponse.categories})
}catch(error){
    console.error(error)
}


    }


    useEffect(()=>{getLandingData()},[])

    return <div className="landing-page">
 
 <div className="shop-now-section">
<h3>Welcome to Bookmart,</h3>
<h1>For All Your <span>Reading </span>Needs</h1>
<Link to='/books' className="shop-now-btn">Shop Now</Link>
 </div>

<div className="categories-section">
    <h2 className="categories-section-header">Featured Book Categories</h2>
    <p className="categories-section-subheader">There are many categories of books available at Bookmart. Choose your favorite one now.</p>
    <ul>
        {state.categoriesList.map(({categoryName , description , _id})=>{
            return <li className="category-block" key={_id}>
                <h3>{categoryName}</h3>
                <p>{description}</p>
            </li>
        })}
     
    </ul>
</div>

<div className="footing-section">
    <div className="app-info">

    <h1>Bookmart</h1>
    <h3>Fill your house with stacks of books, in all the crannies and all the nooks.</h3>
    <h3>Privacy Policy</h3>
    <h3>Terms of Use</h3>
    <p><i className="fa-regular fa-copyright"></i>No copyright</p>
    </div>
    <div className="contact-sub-section">
        <h3>Connect</h3>
    <div className="contact-links">
        <a href="/">GitHub</a><a href="/">Twitter</a><a href="/">LinkedIn</a>
    </div>
    </div>
    <div className="resources-sub-section">
        <h3>Resources</h3>
        <div className="resources-links">
        <a href="/">Sign Up</a><a href="/">Sign In</a>
        </div>
        
    </div>
</div>

    </div>
}