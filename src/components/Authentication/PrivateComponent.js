import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateComponent() {
    const auth = JSON.parse(localStorage.getItem('user'))
    return auth ? <Outlet/> : <Navigate to="/entertainment-web-app/signUp"/>
}

export default PrivateComponent