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
    return ({...state , booksList:action.payload , renderList:action.payload})
}

case 'OPEN_BOOK' :
    {
        return ({...state , bookDetails:action.payload})
    }

case 'FILTER_BY_PRICE':
    {
const filteredList = state.booksList.filter(({price})=>price<(action.payload*10))
return ({...state , renderList:filteredList})
}    

case 'FILTER_BY_CATEGORY':
    {
    const filteredList = state.booksList.filter(({category})=>category===action.payload.value)
return ({...state , renderList:filteredList})
return ({...state , category:action.payload.value})
}

case 'FILTER_BY_RATING':
    {
        const filteredList = state.booksList.filter(({rating})=>rating>action.payload)
        return ({...state , renderList:filteredList})
        
return ({...state , category:action.payload})
        }
   


default:
return state

}

}


const initialValue = {
booksList:[],
renderList:[],
    categoriesList:[],
    cartList:[],
    bookDetails:{},
    category:'',
    rating:''


}

const [state , dispatch] = useReducer(landingReducerFunction , initialValue)

return <AppContext.Provider value={{state , dispatch}}>
    {children}
</AppContext.Provider>


}
