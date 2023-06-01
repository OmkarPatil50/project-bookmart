import { useContext, useEffect } from "react"
import { AppContext } from "../.."
import { Link } from "react-router-dom"

export const Products = () => {

const {state , dispatch} = useContext(AppContext)


const getBooksList = async()=>{

try{

    const response = await fetch('/api/products')
    const jsonResponse = await response.json()
    dispatch({type:'UPDATE_BOOKSLIST' , payload:jsonResponse.products})

}catch(err){
    console.error(err)
}



}

  
useEffect(()=>{getBooksList()},[])

    return <div className="books-list">
<h2>All Books</h2>

     <ul>

    {
        state.booksList.map(({author,
            category,
            img,            isBestSeller,
            name,
            originalPrice,
            price,rating ,_id}) => {
                               return <Link to={`/books/${_id}`} key={_id}>
<img src={img} alt="books-image" />
{isBestSeller?<p>'Best Seller'</p> : ''} 
<h2>{name}  </h2>
<p>{author}</p>
<p>{rating}</p>
<p>{price}</p>
<p>{originalPrice}</p>
<p>({(((originalPrice - price)/originalPrice)*100).toFixed(0)} % OFF)</p>
<button>Add to Cart</button>

               </Link>
            })
    }
     </ul>
    </div>


}
