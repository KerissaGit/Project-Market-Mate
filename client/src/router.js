import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import App from "./components/App";
import Groceries from "./components/Groceries";
import User from "./components/User"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "groceries",
        element: <Groceries />,
      },
      {
        path: "user", 
        element: <User />,
      },
    ],
  },
]);


export default router;
