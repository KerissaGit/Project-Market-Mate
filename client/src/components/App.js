import "../index.css";
import React from "react";
// import { Switch, Route } from "react-router-dom";
// import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Groceries from "./Groceries";
import HomePage from "./HomePage";
import ItemsCart from "./ItemsCart";


function App() {
  return(
    <div className="body">
      <Header />
      <HomePage />
      <Groceries />
      <ItemsCart />
      <Footer />
    </div>
  )  
}

export default App;
