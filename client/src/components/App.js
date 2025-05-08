// import "../index.css";
// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation, Navigate } from "react-router-dom";

// import Header from "./Header";
// import Footer from "./Footer";
// import HomePage from "./HomePage";
// import User from "./User";


// function App() {
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     fetch('/me', { credentials: 'include' })
//       .then(res => res.ok ? res.json() : Promise.reject())
//       .then(user => setLoggedInUser(user))
//       .catch(() => setLoggedInUser(null));
//   }, []);

//   function logoutUser() {
//     fetch('/logout', { method: 'DELETE', credentials: 'include' })
//       .then(() => setLoggedInUser(null));
//   }

//   const publicPaths = ['/login', '/signup'];

//   // if (loggedInUser === null && location.pathname !== "/login" && location.pathname !== "/signup") {
//   //   return <Navigate to="/login" />;
//   // }

//   if (!loggedInUser && !publicPaths.includes(location.pathname)) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="body">
//       <Header logoutUser={logoutUser}/>
//       {/* <Outlet context={[loggedInUser, setLoggedInUser]}/> */}
//       <Outlet context={{ setUser: setLoggedInUser }}/>
      
//       <Footer />
//     </div>
//   );
// }


// export default App;



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

