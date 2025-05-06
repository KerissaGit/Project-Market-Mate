// import "../index.css";
// import { Outlet, useLocation } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// import Header from "./Header";
// import Footer from "./Footer";
// import HomePage from "./HomePage";
// // import User from "./User";
// import Auth from "./Auth";
// // import Groceries from "./Groceries";
// // import ItemsCart from "./ItemsCart";
// // import Deli from "./Deli";



// function App() {
//   const [loggedInUser, setLoggedInUser ] =useState(null)
//   const location = useLocation();

//   function logoutUser() {
//     setLoggedInUser(null)
//   }

//   useEffect(() => {
//     fetch('/me', {
//       method: 'GET',
//       credentials: 'include'
//     })
//     .then(res => res.ok ? res.json() : Promise.reject())
//     .then(data => setLoggedInUser(data))
//     .catch(() => setLoggedInUser(null));
//   }, []);
  

//   const isRoot = location.pathname === "/";


// //   return(
// //     <div className="body">
// //       <Header logoutUser={logoutUser}/>
// //       {
// //         !!loggedInUser ?
// //         <Outlet /> :
// //         <>
// //         <User setUser={setLoggedInUser} />
// //         {isRoot && <HomePage />}
// //         </>
// //       }
  
// //       <Footer />
// //     </div>
// //   )  
// // }


// // export default App;

//   return (
//     <div className="body">
//       <Header logoutUser={logoutUser} />
//       {!!loggedInUser ? (
//         <Outlet context={[loggedInUser, setLoggedInUser]} />
//       ) : (
//         <>
//           <Auth setUser={setLoggedInUser} />
//           {isRoot && <HomePage />}
//         </>
//       )}
//       <Footer />
//     </div>
//   );
// }

// export default App;


import "../index.css";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import User from "./User";


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const location = useLocation();

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

  const isRoot = location.pathname === "/";


  return (
    <div className="body">
      <Header logoutUser={logoutUser} />
      {!!loggedInUser ? (
        <Outlet context={[loggedInUser, setLoggedInUser]} />
      ) : (
        <>
          <User setUser={setLoggedInUser} />
          {isRoot && <HomePage />}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;