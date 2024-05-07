import React from "react";
import "./App.css";
import Layout from "./components/Layout";
function App() {
  return (
    // 1st background color
    <div className="bg-[#10141E] p-6 flex justify-start cursor-pointer overflow-y-scroll" style={{height: "100vh"}}>
      <Layout />
    </div>
  );
}

export default App;
