// // import React from "react";
// // import { Navigate, Outlet, useOutletContext } from "react-router-dom";

// // function ProtectedRoute() {
// //   const { loggedInUser } = useOutletContext();

// //   if (!loggedInUser) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return <Outlet />;
// // }

// // export default ProtectedRoute;


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// function ProtectedRoute({ loggedInUser }) {
//   // If the user is not logged in, redirect to login page
//   if (!loggedInUser) {
//     return <Navigate to="/login" />;
//   }

//   // If the user is logged in, render the child route (outlet)
//   return <Outlet />;
// }

// export default ProtectedRoute;
