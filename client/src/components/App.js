import "../index.css";
import React from "react";
// import { Switch, Route } from "react-router-dom";
// import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Groceries from "./Groceries";
import HomePage from "./HomePage";
import ItemsCart from "./ItemsCart";
import Deli from "./Deli";


function App() {
  return(
    <div className="body">
      <Header />
      <HomePage />
      <Groceries />
      <Deli />
      <ItemsCart />
      <Footer />
    </div>
  )  
}

export default App;
