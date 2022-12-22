import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  price: {
    require: true,
    type: Number,
  },
  category: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  sku: {
    require: true,
    type: String,
  },
  imageUrl: {
    require: true,
    type: String,
  },
});
export default mongoose.model("product", productSchema);
