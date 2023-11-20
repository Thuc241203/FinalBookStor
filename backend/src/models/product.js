import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugin = [mongoosePaginate, mongooseDelete];

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
      ref: "Upload",
    },
    price: {
      type: Number,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    rate: {
      type: mongoose.Schema.Types.Number,
      ref: "Feedback",
    },
    sold: {
      type: Number,
      require: true,
    },
    quantityStock: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
plugin.forEach((plugin) => {
  productsSchema.plugin(plugin, {
    deletedAt: true,
    overrideMethods: true,
  });
});
export default mongoose.model("Product", productsSchema);
