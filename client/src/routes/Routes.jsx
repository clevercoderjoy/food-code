import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Restaurants from "../pages/Restaurants";
import Error from "../pages/Error";
import About from "../pages/About";
import Cart from "../pages/Cart";
import RestaurantPage from "../pages/RestaurantPage";
import Admin from "../pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "restaurants",
        children: [
          {
            index: true,
            element: <Restaurants />
          },
          {
            path: ":restaurantId",
            element: <RestaurantPage />
          }
        ]
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <Admin />
          },
        ]
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
])