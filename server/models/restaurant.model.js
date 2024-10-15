import mongoose from "mongoose";

const restaurant = new mongoose.Schema({
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
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
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
  city: {
    type: String,
    required: true,
  },
  cuisines: {
    type: [String],
    required: true,
  },
  offers: {
    type: String,
    required: true,
  },
})