import { useContext, useEffect } from "react"
import { LanderContext } from "../.."

export function Landing(){

const {state , dispatch} = useContext(LanderContext)

    const getLandingData = async()=>{

try{

const response = await fetch('/api/categories')
const jsonResponse = await response.json()

dispatch({type:'UPDATE_CATEGORIES' , payload:jsonResponse.categories})
}catch(error){
    console.log(error)
}


    }


    useEffect(()=>{getLandingData()},[])

    return <div className="landing-page">
        <nav>
            <h2>BookMart</h2>
            <label htmlFor="search-book"><input type="text" placeholder="Search for Product" /></label>
            <button>
                Wishlist</button><button>
                    Cart</button><button>
                        Login
                    </button>
        </nav>

<div className="categories-section">
    <h2>Featured Book Categories</h2>
    <p>There are many categories of books available at Pustaka. Choose your favorite one now.</p>
    <ul>
        {state.categoriesList.map(({categoryName , description , _id})=>{
            return <li className="category-block" key={_id}>
                <h3>{categoryName}</h3>
                <p>{description}</p>
            </li>
        })}
     
    </ul>
</div>

    </div>
}