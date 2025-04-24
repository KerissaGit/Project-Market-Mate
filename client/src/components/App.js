import "../index.css";
import React from "react";
// import { Switch, Route } from "react-router-dom";
// import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Groceries from "./Groceries";


function App() {
  return(
    <div className="body">
      <h1>Market Mate App</h1>
      <Header />
      <Groceries />
      <Footer />
    </div>
  )  
}

export default App;
