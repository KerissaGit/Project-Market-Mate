import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Groceries from "./components/Groceries";
import Deli from "./components/Deli";
import ItemsCart from "./components/ItemsCart";
import User from "./components/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="users" element={<User />} />
        <Route path="groceries" element={<Groceries />} />
        <Route path="deli" element={<Deli />} />
        <Route path="itemscart" element={<ItemsCart />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  </BrowserRouter>
);
