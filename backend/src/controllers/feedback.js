import Feedback from "../models/feedback.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import Order from "../models/order.js";

export const getAll = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    if (!feedbacks) {
      return res.status(400).json("Feedbacks not found!");
    }
    return res
      .status(200)
      .json({ message: "Get feedback success!", feedbacks });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const get = async (req, res) => {
  try {
    const productId = req.params.id;
    const feedbacks = await Feedback.find({ productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    if (feedbacks.length === 0) {
      return res.status(400).json("Không tìm thấy feedback");
    }
    return res
      .status(200)
      .json({ message: "Lấy feedback thành công!", feedbacks });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const create = async (req, res) => {
  try {
    const { userId, productId, orderId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("Không tìm thấy người dùng");
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json("Không tìm thấy sản phẩm");
    }
    const orderById = await Order.findById(orderId);
    const isCheck = orderById.isDelivered;
    if (!isCheck) {
      return res
        .status(400)
        .json("Bạn chưa mua hàng hoặc đơn hàng chưa được giao!");
    }
    const feedback = await Feedback.create(req.body);
    if (feedback) {
      const productFeedback = await Feedback.find({ productId });
      const totalRating = productFeedback.reduce(
        (total, item) => total + item.rating,
        0
      );
      const lengthFeedback = productFeedback.length;
      const averageRating = totalRating / lengthFeedback;
      await Product.findByIdAndUpdate(productId, {
        $set: { rate: averageRating },
      });
    }
    if (!feedback) {
      return res.status(400).json("Không tìm thấy đánh giá");
    }

    return res
      .status(200)
      .json({ message: "create feedback successly!", feedback });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
