import mongoose, { mongo } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  totalRatings: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  deliveryTime: {
    type: Number,
    required: true,
  },
  costForTwo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cuisines: {
    type: [String],
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  restaurantMenu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantMenu",
    }
  ]
}, { timestamps: true });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);