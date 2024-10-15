import mongoose from "mongoose";

const restaurantMenuSchema = new mongoose.Schema({
  offers: {
    type: [String],
  },
  dish: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    }
  ]
}, { timestamps: true })

export const RestaurantMenu = mongoose.Model("RestaurantMenu", restaurantMenuSchema)