import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    require: true,
    match: /[a-z]/,
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("category", categorySchema);
