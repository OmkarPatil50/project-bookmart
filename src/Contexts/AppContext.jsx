import { useReducer } from "react";
import { AppContext } from "..";


export function AppContextProvider({children}){
 
    
const landingReducerFunction = (state , action)=>{

switch(action.type){

case 'UPDATE_CATEGORIES' :
{
    return ({...state , categoriesList:action.payload})
}

default:
return state

}

}


const initialValue = {

    categoriesList:[]


}

const [state , dispatch] = useReducer(landingReducerFunction , initialValue)

return <AppContext.Provider value={{state , dispatch}}>
    {children}
</AppContext.Provider>


}
