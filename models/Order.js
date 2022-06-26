import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    order: [],
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", ProductSchema);
