import { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { AppContext } from "../.."

export const ProductDetails = () => {
 
    const {bookID} = useParams()
const {state , dispatch} = useContext(AppContext)

const getBookDetails = async()=>{
    const response = await fetch(`/api/products/${bookID}`)
    const jsonResponse = await response.json()
    dispatch({type:'OPEN_BOOK' ,  payload:jsonResponse.product})
}

    useEffect(()=>{getBookDetails()},[])


const {author,
    category,
    img,            isBestSeller,
    name,
    originalPrice,
    price,rating ,_id} = state.bookDetails
   
    return <div>
<img src={img} alt="books-image" />
{isBestSeller?<p>'Best Seller'</p> : ''} 
<h2>{name}  </h2>
<p>{rating}</p>
<p>{price}</p>
<p>{originalPrice}</p>
<p>({(((originalPrice - price)/originalPrice)*100).toFixed(0)} % OFF)</p>
<p><i className="fa-sharp fa-solid fa-bolt"></i>Hurry , Only Few Left !</p>
<p><i className="fa-solid fa-tag"></i>Fastest Delivery</p>
<p><i className="fa-solid fa-tag"></i>Inclusive of All Taxes</p>
<p><i className="fa-solid fa-tag"></i>Cash On Delivery Available</p>
<p>Author : {author}</p>
<p>Category : {category}</p>
<p>Binding : Hard Cover</p>
<p>Language : English</p>

<button>Add to Cart</button>
<button>Add to Wishlist</button>


    </div>

}
