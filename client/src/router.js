import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import HomePage from "./components/HomePage";
import Groceries from "./components/Groceries";
import User from "./components/User";
import Auth from "./components/Auth";
import Deli from "./components/Deli";
import ItemsCart from "./components/ItemsCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage />,},
      { path: "login", element: <Auth />,},
      { path: "users", element: <User />,},
      { path: "groceries", element: <Groceries />,},
      { path: "deli", element: <Deli />,},
      { path: "itemscart", element: <ItemsCart />,},
    ],
  },
]);

export default router;
