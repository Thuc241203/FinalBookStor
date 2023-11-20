import mongoose from "mongoose";
const uploadSchema = new mongoose.Schema(
  {
    images: Array,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Upload", uploadSchema);
