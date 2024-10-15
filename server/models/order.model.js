import mongoose from "mongoose";

export const orderItemSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderItems: {
    type: [orderItemSchema],
  },
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    default: "PENDING",
  },
}, { timestamps: true });

export const Order = new mongoose.Model("Order", orderSchema);