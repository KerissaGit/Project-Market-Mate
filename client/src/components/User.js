// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import Auth from "./Auth";
// import Header from "./Header"; 


// function User() {
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     fetch('/me', {
//       method: 'GET',
//       credentials: 'include',
//     })
//       .then(res => res.ok ? res.json() : Promise.reject())
//       .then(data => setLoggedInUser(data))
//       .catch(() => setLoggedInUser(null))
//       .finally(() => setLoading(false));
//   }, []);

//   const logoutUser = () => {
//     fetch('/logout', {
//       method: 'DELETE',
//       credentials: 'include',
//     }).then(() => setLoggedInUser(null));
//   };

//   if (loading) return <p>Loading...</p>;


//   return (
//     <div className="body">
//       <Header logoutUser={logoutUser} />
//       {loggedInUser ? (
//           <Outlet context={[loggedInUser, setLoggedInUser]} /> 
//       ) : (
//           <Auth setUser={setLoggedInUser} />
//       )}
//     </div>
//   );
// }


// export default User;




import React from 'react';


function User({ user, onLogout }) {
  if (!user) return null;


  return (
    <div className="user-banner">
      <p>Welcome, <strong>{user.username}</strong>!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}


export default User;
