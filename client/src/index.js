// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./components/App";



// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );


import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";  // Import RouterProvider
import router from './router';  // Import the router setup

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);  // Use RouterProvider with the router
