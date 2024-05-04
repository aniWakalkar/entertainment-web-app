import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
        <Route exact path="/entertainment-web-app/" element={<Home />} />
        <Route
          exact
          path="/entertainment-web-app/Movies"
          element={<Movies />}
        />
        <Route
          exact
          path="/entertainment-web-app/Tv_series"
          element={<TvSeries />}
        />
        <Route
          exact
          path="/entertainment-web-app/Saved"
          element={<Saved />}
        />
        {/* <Route
          exact
          path="/entertainment-web-app/FlashcardDetailsPage/:id"
          element={<FlashcardDetailsPage />}
        /> */}
      </Routes>
    </Router>
  );
}

export default Layout;
