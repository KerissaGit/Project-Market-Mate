import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./components/HomePage";
import Groceries from "./components/Groceries";
import Deli from "./components/Deli";
import ItemsCart from "./components/ItemsCart";
import User from "./components/User";
import Auth from "./components/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="users" element={<User />} />
        <Route path="login" element={<Auth setUser={setLoggedInUser}/>} />
        <Route path="signup" element={<Auth setUser={setLoggedInUser}/>} />
        <Route path="groceries" element={<Groceries />} />
        <Route path="deli" element={<Deli />} />
        <Route path="itemscart" element={<ItemsCart />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  </BrowserRouter>
);
