import express from "express";
import { Restaurant } from "../models/restaurant.model";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
  }
  catch (e) {
    res.status(404).json({ message: "Error fetching categories." })
  }
})