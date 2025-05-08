import "../index.css";
import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(user => setUser(user))
      .catch(() => setUser(null));
  }, []);

  function logoutUser() {
    fetch('/logout', { method: 'DELETE', credentials: 'include' })
      .then(() => setUser(null));
  }

  return (
    <div className="body">
      <Header logoutUser={logoutUser} user={user} />
      <Outlet context={{ user, setUser }} />
      <Footer />
    </div>
  );
}

export default App;
