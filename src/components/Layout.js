import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./Authentication/LogIn";
import PrivateComponent from "./Authentication/PrivateComponent";
import SignUp from "./Authentication/SignUp";
import Home from "./Home";
import Movies from "./Movies";
import NavbarSimple from "./NavbarSimple";
import Saved from "./Saved";
import TvSeries from "./TvSeries";

function Layout() {

  return (
    <Router className="cursor-pointer">
      <NavbarSimple />
      <Routes>
        <Route path="/entertainment-web-app/signUp" element={<SignUp />} />
        <Route path="/entertainment-web-app/logIn" element={<LogIn />} />
        <Route element={<PrivateComponent />}>
          <Route path="/entertainment-web-app/" element={<Home />} />
          <Route path="/entertainment-web-app/Movies" element={<Movies />} />
          <Route path="/entertainment-web-app/Tv_series" element={<TvSeries />} />
          <Route path="/entertainment-web-app/Saved" element={<Saved />} />
        </Route>
        {/* <Route
          path="/entertainment-web-app/FlashcardDetailsPage/:id"
          element={<FlashcardDetailsPage />}
        /> */}
      </Routes>
    </Router>
  );
}

export default Layout;
