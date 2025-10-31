import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isSold: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
