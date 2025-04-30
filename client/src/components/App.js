import "../index.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
// import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Groceries from "./Groceries";
import HomePage from "./HomePage";
import ItemsCart from "./ItemsCart";
import Deli from "./Deli";
import User from "./User";



// function App() {
//   return(
//     <div className="body">
//       <Header />
//       <HomePage />
//       <User />
//       <Groceries />
//       <Deli />
//       <ItemsCart />
//       <Footer />
//     </div>
//   )  
// }

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/groceries" component={Groceries} />
        <Route path="/user" component={User} />
      </Switch>
    </div>
  );
}


export default App;
