import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function PrivateComponent() {
    const search_token = useSelector((state) => state.search_token);
    // const auth = JSON.parse(localStorage.getItem('user'))
    return search_token ? <Outlet/> : <Navigate to="/entertainment-web-app/signUp"/>
}

export default PrivateComponent