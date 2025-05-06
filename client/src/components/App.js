import "../index.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Groceries from "./Groceries";
import HomePage from "./HomePage";
import ItemsCart from "./ItemsCart";
import Deli from "./Deli";
import User from "./User";
import Auth from "./Auth";




function App() {
  const [loggedInUser, setLoggedInUser ] =useState(null)

  function logoutUser() {
    setLoggedInUser(null)
  }


  return(
    <div className="body">
      <Header logoutUser={logoutUser}/>
      {
        !!loggedInUser ?
        <Outlet /> :
        // <Auth setUser={setLoggedInUser} />
        <User setUser={setLoggedInUser} />
      }
      <HomePage />
      <Groceries />
      <Deli />
      <ItemsCart />
      <Footer />
    </div>
  )  
}




// function App() {
//   return (
//     <div>
//       <Switch>
//         <Route exact path="/" component={HomePage} />
//         <Route path="/groceries" component={Groceries} />
//         <Route path="/user" component={User} />
//       </Switch>
//     </div>
//   );
// }


export default App;
