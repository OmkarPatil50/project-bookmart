import { Navigate } from "react-router";

export function Auth({children, isLoggedIn}){
return isLoggedIn? children:<Navigate to='/login'/>
}