import { useContext, useEffect } from "react"
import { AppContext } from "../.."
import { Link } from "react-router-dom"
import './Products.css'

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

const addToCart = async (book) =>{
try{

const response = await fetch('/api/user/cart' , {
    method: 'POST',
    headers:{
        authorization: localStorage.getItem('encodedToken')
    ,
} ,
body : JSON.stringify({
    product: book
 })

})
const jsonResponse = await response.json()

dispatch({type:'UPDATE_CART' , payload:jsonResponse.cart})

}catch(err){
    console.error(err)
}

}

useEffect(()=>{getBooksList()},[])

    return <div className="books-page">

        <div className="section-filters">
<div className="filter-keys">
    <h3>Filters</h3>
    <h3>Clear</h3>
</div>
<div className="filter-by-price">
    <label htmlFor="filter-by-price">Price <span>(Not more than)</span></label>
    <div className="range">
        <p><i className="fa-solid fa-indian-rupee-sign"></i> 100</p>
        <p><i className="fa-solid fa-indian-rupee-sign"></i> 500</p>
        <p><i className="fa-solid fa-indian-rupee-sign"></i> 1000</p>
    </div>
    <input type="range" name="price" defaultValue={50} min={10} step={10} onChange={(event)=>dispatch({type:'FILTER_BY_PRICE' , payload:event.target.value})}/>
</div>
<div className="filter-by-category">
    <h3>Category</h3>
    
    <label htmlFor="Fiction"> <input type="radio" onChange={(event)=>dispatch({type:'FILTER_BY_CATEGORY' , payload:event.target})} value="Fiction" name="category" /> Fiction</label>
    <label htmlFor="Non-Fiction">    <input type="radio" onChange={(event)=>dispatch({type:'FILTER_BY_CATEGORY' , payload:event.target})} value="Non Fiction" name="category" />    
Non-Fiction</label>
    
    <label htmlFor="Self Help"><input type="radio" onChange={(event)=>dispatch({type:'FILTER_BY_CATEGORY' , payload:event.target})} value="Self Help" name="category" />Self Help</label>

</div>

<div className="filter-by-rating">
    <h3>Rating</h3>
    <label htmlFor="rating-above-one">    <input type="radio" name="rating" value='1' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
1 Stars & above</label>
    <label htmlFor="rating-above-two">    <input type="radio" name="rating" value='2' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
2 Stars & above</label>  
    <label htmlFor="rating-above-three">    <input type="radio" name="rating" value='3' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
3 Stars & above</label>   
    <label htmlFor="rating-above-four">    <input type="radio" name="rating" value='4' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
4 Stars & above</label>
</div>

<div className="sort">
    <h3>Sort by</h3>
    
    <label htmlFor="sort-low-to-high"><input type="radio" name="sort" value='low-to-high'  />
Price - Low to High
</label>
    
    <label htmlFor="sort-high-to-low"><input type="radio" name="sort" value='high-to-low'  />
Price - High to Low</label>  
</div>

        </div>

<div className="section-books">
<h2 className="section-books-heading">Showing All Books <span className="book-count">{`   (${state.renderList.length} Books)`}</span></h2>
     <ul>

    {
        state.renderList.map((book) => {

            const {author,
                category,
                img,            isBestSeller,
                name,
                originalPrice,
                price,rating ,_id} = book

                               return <div className="book-card">
<Link to={`/books/${_id}`} key={_id}>
    <div className="book-thumbnail">

<img src={img} alt="books-image" />
{isBestSeller?<p className="best-seller-tag-products">Best Seller</p> : ''} 
<div className="wishlist-tag"><i className="fa-solid fa-heart"></i></div>
    </div>
<div className="name-rating-section">
    <div className="name-author-section">

<h2 className="book-name-products">{name}  </h2>
<p className="author-tag">{author}</p>
    </div>
<p className="rating-tag">{rating}<i className="fa-solid fa-star"></i> </p>
    </div>

    <div className="price-section-products">
<p className="book-price"><i className="fa-solid fa-indian-rupee-sign"></i>{price}</p>
<p className="book-original-price"><i className="fa-solid fa-indian-rupee-sign"></i>{originalPrice}</p>
<p className="book-discount">({(((originalPrice - price)/originalPrice)*100).toFixed(0)} % OFF)</p>

    </div>
<button className="btn-cart-products" onClick={()=>addToCart(book)}><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>

               </Link>
                               </div> 
                               
                               
            })
    }
     </ul>

</div>


    </div>


}
