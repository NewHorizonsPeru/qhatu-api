import { string } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    require: true,
    type: String,
  },
  firstName: {
    require: true,
    type: String,
  },
  lastName: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  role: {
    require: true,
    type: String,
  },
});

export default mongoose.model("user", userSchema);
