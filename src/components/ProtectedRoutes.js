import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
import MyProfile from './MyProfile'

export default function ProtectedRoutes(){

    return (
    !!JSON.parse(localStorage.getItem("activeProfile")) ? <Outlet /> : <Navigate to="/auth/login"/>
    )
}

// check condition for protect login page
export function ProtectedLogin (){
    return(
        JSON.parse(localStorage.getItem("activeProfile")) ?  <Navigate to="/MyProfile" />  : <Outlet/>
    )
}
