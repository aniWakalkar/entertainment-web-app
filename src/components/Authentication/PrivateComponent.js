import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateComponent() {
    const auth = JSON.parse(localStorage.getItem('user'))
    console.log(auth && auth.logged)
    return auth && auth.logged ? <Outlet/> : <Navigate to="/entertainment-web-app/signUp"/>
}

export default PrivateComponent