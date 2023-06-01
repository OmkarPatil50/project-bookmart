import { useReducer } from "react";
import { AppContext } from "..";


export function AppContextProvider({children}){
 
    
const landingReducerFunction = (state , action)=>{

switch(action.type){

case 'UPDATE_CATEGORIES' :
{
    return ({...state , categoriesList:action.payload})
}


case 'UPDATE_CART' :
{
    return ({...state , cartList:action.payload})
}

case 'UPDATE_BOOKSLIST' :
{
    return ({...state , booksList:action.payload})
}

case 'OPEN_BOOK' :
    {
        return ({...state , bookDetails:action.payload})
    }


default:
return state

}

}


const initialValue = {
booksList:[],
    categoriesList:[],
    cartList:[],
    bookDetails:{}


}

const [state , dispatch] = useReducer(landingReducerFunction , initialValue)

return <AppContext.Provider value={{state , dispatch}}>
    {children}
</AppContext.Provider>


}
