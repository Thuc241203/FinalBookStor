import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    shopping: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      require: true,
    },
    products: {
      type: mongoose.Schema.Types.Array,
      ref: "Product",
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);
