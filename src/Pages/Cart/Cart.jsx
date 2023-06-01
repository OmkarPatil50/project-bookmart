import { useContext, useEffect } from "react"
import { AppContext } from "../.."

export const Cart = () => {


    const {state ,dispatch} = useContext(AppContext)
  
const getCartData =async()=>{

    try{

        const response = await fetch('/api/user/cart')
        const jsonResponse = await response.json()
        dispatch({type:'UPDATE_CART' , payload:jsonResponse.cart})

    }catch(err){
        console.error(err)
    }

}


    useEffect(()=>{getCartData()},[])
console.log(state.cartList)
return <div>
    <h1>My Cart</h1>
    <section>
        <ul>
            {/* {state.cartList.map({})} */}
        </ul>
    </section>
</div>

}
