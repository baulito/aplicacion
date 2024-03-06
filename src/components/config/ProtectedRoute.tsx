import {Navigate,Outlet} from 'react-router-dom';
import { useContext } from "react"
import { useGlobalContext } from "../../context/Main";
export  const ProtectedRoute = ()=>{
    const {mainState} = useGlobalContext();

    if( mainState.user && (mainState.user?.user_id  === undefined || (mainState.user?.user_id && mainState.user?.user_id <= 0 )) ){
        return <Navigate to={"/"}/>  
    }
    return <Outlet/>;
}