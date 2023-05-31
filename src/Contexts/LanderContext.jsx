import { useReducer } from "react";
import { LanderContext } from "..";


export function LanderContextProvider({children}){
 
    
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

return <LanderContext.Provider value={{state , dispatch}}>
    {children}
</LanderContext.Provider>


}
