import React from "react";
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateComponent from "./Authentication/PrivateComponent";
import Home from "./Home";
import LogIn from "./LogIn";
import Movies from "./Movies";
import NavbarSimple from "./NavbarSimple";
import Saved from "./Saved";
import SignUp from "./SignUp";
import TvSeries from "./TvSeries";

function Layout() {
  const search_token = useSelector((state) => state.search_token);
  return (
    <Router className="cursor-pointer">
      {search_token && <NavbarSimple />}
      <Routes>
        <Route path="/entertainment-web-app/signUp" element={<SignUp />} />
        <Route path="/entertainment-web-app/logIn" element={<LogIn />} />
        <Route element={<PrivateComponent />}>
          <Route path="/entertainment-web-app/" element={<Home />} />
          <Route path="/entertainment-web-app/Movies" element={<Movies />} />
          <Route path="/entertainment-web-app/Tv_series" element={<TvSeries />} />
          <Route path="/entertainment-web-app/Saved" element={<Saved />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Layout;
