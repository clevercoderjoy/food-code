import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/RestaurantsSlice";
import cartReducer from "../slice/CartSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})