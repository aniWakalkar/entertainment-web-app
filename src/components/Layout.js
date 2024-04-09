import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Home_1 from "./Home_1";
import NavbarSimple from "./NavbarSimple";

function Layout() {
  return (
    <Router className="bg-[#ffc0cb0d]">
      <NavbarSimple />
      <Routes>
        <Route exact path="/entertainment-web-app/" element={<Home />} />
        <Route exact path="/entertainment-web-app/Home" element={<Home_1 />} />
        {/* <Route
          exact
          path="/entertainment-web-app/MyFlashcardsPage"
          element={<MyFlashcardsPage />}
        /> */}
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
