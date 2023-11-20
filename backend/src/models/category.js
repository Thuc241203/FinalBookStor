import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugin = [mongoosePaginate, mongooseDelete];

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  isDeleteable:{
    type:Boolean,
    default: true
  },
  products: [
    {type: mongoose.Types.ObjectId, ref: "Product"}
  ]
},{timestamps: true, versionKey: false})
plugin.forEach((plugin)=> {
  categorySchema.plugin(plugin)
})
export default mongoose.model('Category', categorySchema)