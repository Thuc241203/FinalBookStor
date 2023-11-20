import User from "../models/user.js";
import Order from "../models/order.js";

export const updateProfile = async (req, res) => {
  try {
    const updateProfile = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await Order
    return res.status(200).json(updateProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllProfile = async (req, res) => {
  try {
    const user = await User.find();
    if(!user){
      return res.status(400).json({message: 'Không tìm thấy người dùng'})
    }
    return res.status(200).json({
      message:"Lấy thông tin người dùng thành công",
      user
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(400).json({message: 'Không tìm thấy người dùng'})
    }
    return res.status(200).json({
      message:"Lấy thông tin người dùng thành công",
      user
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
