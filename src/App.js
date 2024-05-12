import React from "react";
import "./App.css";
import Layout from "./components/Layout";
function App() {
  return (
    // 1st background color
    // when screen size lg screen will be a flex-blox
    <div className="bg-[#10141E] lg:flex lg:justify-start cursor-pointer overflow-y-auto h-dvh p-4 lg:pt-4 lg:pb-0">
      <Layout />
    </div>
  );
}

export default App;
