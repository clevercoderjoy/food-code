import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Restaurants from "../pages/Restaurants";
import Error from "../pages/Error";
import About from "../pages/About";
import Cart from "../pages/Cart";
import RestaurantPage from "../pages/RestaurantPage";
import AddRestaurant from "../pages/AddRestaurant";
import AddFood from "../pages/AddFood";
import AdminRoute from "./AdminRoutes";
import MyAccount from "../pages/MyAccount";
import RequireAuth from "../services/RequireAuth";

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
          },
          {
            path: "addRestaurant",
            element: <AdminRoute element={<AddRestaurant />} />
          },
          {
            path: "addFood",
            element: <AdminRoute element={<AddFood />} />
          },
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
        path: "myAccount",
        element: (
          <RequireAuth>
            <MyAccount />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  }
])