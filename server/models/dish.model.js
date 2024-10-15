import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    required: true,
  },
  dishImg: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true })

export const Dish = mongoose.model("Dish", dishSchema)