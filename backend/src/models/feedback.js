import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    comment: { type: String, require: true },
    rating: { type: Number, require: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    feedbacked: { type: Boolean, default: false},
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Feedback", feedbackSchema);
