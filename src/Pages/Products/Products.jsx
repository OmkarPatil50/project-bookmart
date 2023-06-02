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

  
useEffect(()=>{getBooksList()},[])

    return <div className="books-page">

        <div className="section-filters">
<div className="filter-keys">
    <h3>Filters</h3>
    <h3>Clear</h3>
</div>
<div className="filter-by-price">
    <label htmlFor="filter-by-price">Price <span>(Not more than)</span></label>
    <input type="range" name="price" defaultValue={50} onChange={(event)=>dispatch({type:'FILTER_BY_PRICE' , payload:event.target.value})}/>
</div>
<div className="filter-by-category">
    <h3>Category</h3>
    <input type="radio" onChange={(event)=>dispatch({type:'FILTER_BY_CATEGORY' , payload:event.target})} value="Fiction" name="category" />
    <label htmlFor="Fiction">Fiction</label>
    <input type="radio" onChange={(event)=>dispatch({type:'FILTER_BY_CATEGORY' , payload:event.target})} value="Non Fiction" name="category" />    
    <label htmlFor="Non-Fiction">Non-Fiction</label>
    <input type="radio" onChange={(event)=>dispatch({type:'FILTER_BY_CATEGORY' , payload:event.target})} value="Self Help" name="category" />
    <label htmlFor="Self Help">Self Help</label>

</div>

<div className="filter-by-rating">
    <h3>Rating</h3>
    <input type="radio" name="rating" value='1' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
    <label htmlFor="rating-above-one">1 Stars & above</label>
    <input type="radio" name="rating" value='2' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
    <label htmlFor="rating-above-two">2 Stars & above</label>  
    <input type="radio" name="rating" value='3' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
    <label htmlFor="rating-above-three">3 Stars & above</label>   
    <input type="radio" name="rating" value='4' onChange={(event)=> dispatch({type:'FILTER_BY_RATING' , payload:event.target.value})} />
    <label htmlFor="rating-above-four">4 Stars & above</label>
</div>

<div className="sort">
    <h3>Sort by</h3>
    <input type="radio" name="sort" value='low-to-high'  />
    <label htmlFor="sort-low-to-high">
Price - Low to High
</label>
    <input type="radio" name="sort" value='high-to-low'  />
    <label htmlFor="sort-high-to-low">
Price - High to Low</label>  
</div>

        </div>

<div className="section-books">
<h2 className="section-books-heading">Showing All Books <span className="book-count">{`   (${state.renderList.length} Books)`}</span></h2>
     <ul>

    {
        state.renderList.map(({author,
            category,
            img,            isBestSeller,
            name,
            originalPrice,
            price,rating ,_id}) => {
                               return <div className="book-card">
<Link to={`/books/${_id}`} key={_id}>
    <div className="book-thumbnail">

<img src={img} alt="books-image" />
{isBestSeller?<p className="best-seller-tag-products">Best Seller</p> : ''} 
<div className="wishlist-tag"><i className="fa-regular fa-heart"></i></div>
    </div>
<div className="name-rating-section">
    <div className="name-author-section">

<h2 className="book-name">{name}  </h2>
<p className="author-tag">{author}</p>
    </div>
<p className="rating-tag">{rating}<i className="fa-solid fa-star"></i> </p>
    </div>

    <div className="price-section-products">
<p className="book-price"><i className="fa-solid fa-indian-rupee-sign"></i>{price}</p>
<p className="book-original-price">{originalPrice}</p>
<p className="book-discount">({(((originalPrice - price)/originalPrice)*100).toFixed(0)} % OFF)</p>

    </div>
<button className="btn-cart-products"><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>

               </Link>
                               </div> 
                               
                               
            })
    }
     </ul>

</div>


    </div>


}
