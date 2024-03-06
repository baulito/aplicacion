import {Navigate, Outlet} from 'react-router-dom';
import { useContext } from "react"
import { useGlobalContext } from "../../context/Main";

export  const NoProtectedRoute = ()=>{
    const {mainState} = useGlobalContext();
    //condicion
    if(mainState.user?.user_id && mainState.user?.user_id > 0 ){
        return <Navigate to={"/"}/>  
    }
    return <Outlet/>;
    
}