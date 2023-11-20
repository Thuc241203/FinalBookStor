import Slider from '../models/slider.js'
export const create = async(req,res)=>{
  try {
    const slider = await Slider.create(req.body);
    if(!slider){
      return res.status(400).json('Slider not found')
    }
    return res.status(200).json({message: 'Create slider successly',slider})
  } catch (error) {
    throw new Error
  }
}
export const get = async(req,res)=>{
  try {
    const slider = await Slider.find();
    if(!slider){
      return res.status(400).json('Slider not found')
    }
    return res.status(200).json({message: 'Get slider successly',slider})
  } catch (error) {
    throw new Error
  }
}
