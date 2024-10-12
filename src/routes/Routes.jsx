import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Restaurants from "../pages/Restaurants";
import RestaurantMenu from "../pages/RestaurantMenu";
import Error from "../pages/Error";
import About from "../pages/About";
import Cart from "../pages/Cart";

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
            element: <RestaurantMenu />
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
        path: "*",
        element: <Error />
      }
    ]
  }
])