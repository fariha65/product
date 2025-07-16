import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: String,
  status: { type: String, enum: ["In Stock", "Stock Out"], default: "In Stock" },
  productCode: { type: String, unique: true },

  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: true,
}

});

export default mongoose.model("Product", productSchema);
