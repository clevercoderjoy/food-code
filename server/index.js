import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB)
    console.log("connected to mongoDB");
  } catch (e) {
    console.log(e);
  }
}

app.get("/", (req, res) => {
  res.send("hello from the server");
})

app.listen(8000, () => {
  connect();
  console.log("connected");
})