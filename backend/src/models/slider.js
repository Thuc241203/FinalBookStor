
import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  images: {type:Array,require:true},
  banner: {type:Array,require:true},
},{ timestamps: true, versionKey: false })
export default mongoose.model('Slider', sliderSchema)