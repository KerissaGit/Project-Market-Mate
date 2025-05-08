import "../index.css";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch('/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(user => setLoggedInUser(user))
      .catch(() => setLoggedInUser(null));
  }, []);

  function logoutUser() {
    fetch('/logout', { method: 'DELETE', credentials: 'include' })
      .then(() => setLoggedInUser(null));
  }

  return (
    <div className="body">
      <Header logoutUser={logoutUser} />
      <Outlet context={{ setUser: setLoggedInUser, loggedInUser }} />
      <Footer />
    </div>
  );
}

export default App;

