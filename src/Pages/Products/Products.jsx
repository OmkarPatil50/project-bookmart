import { useContext, useEffect } from "react"
import { AppContext } from "../.."

export const Products = () => {

const {state , dispatch} = useContext(AppContext)


const getBooksList = async()=>{

try{

    const response = await fetch('/api/products')
    const jsonResponse = await response.json()
    

}catch(err){
    console.error(err)
}



}

  
useEffect(()=>{getBooksList()},[])

    return 
}
