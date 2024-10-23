import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/RestaurantsSlice";
import cartReducer from "../slice/CartSlice";
import userAddressReducer from "../slice/UserAddressSlice";
import userReducer from "../slice/UserSlice";
import foodReducer from "../slice/FoodSlice";
import orderReducer from "../slice/OrderSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    cart: cartReducer,
    userAddress: userAddressReducer,
    user: userReducer,
    food: foodReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})