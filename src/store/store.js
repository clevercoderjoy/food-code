import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slice/RestaurantsSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  }
})