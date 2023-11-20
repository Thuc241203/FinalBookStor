import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    productOrder: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
        name: { type: String, require: true },
        price: { type: Number, require: true },
        images: { type: Array, require: true },
        quantity: { type: Number, require: true },
      },
    ],
    shippingAddress: {
      name: {type:String,require:true},
      phone: {type:Number,require:true},
      address: {type:String,require:true},
    },
    paymentMethod: { type: String, require: true },
    deliveryMethod: { type: String, require: true },
    shippingPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    isPaid: { type: Boolean, default: false },
    isProcessing: { type: Boolean, default: false },
    isDelivering: { type: Boolean, default: false },
    notProcessed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    userId: {type:mongoose.Schema.Types.ObjectId,ref: "User"},
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Order", orderSchema);
