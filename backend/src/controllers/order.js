import Order from "../models/order.js";
import User from "../models/user.js";

export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    if (order.length == 0) {
      return res.status(400).json({
        message: "order not found",
      });
    }
    return res.status(200).json(order);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({
        message: "Order not Found",
      });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const createOrderProduct = async (req, res) => {
  try {
    const { productOrder, value, user, shippingPrice } = req.body;
    const { deliveryMethod, paymentMethod } = value;
    const { phone, name, address } = await User.findById(user);
    const totalPrice = productOrder.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, shippingPrice);
    const idProduct = productOrder.map((item) => item._id);
    console.log("product id: ", idProduct);
    const collectionOrder = {
      productOrder,
      shippingPrice,
      totalPrice,
      deliveryMethod,
      paymentMethod,
      shippingAddress: {
        phone,
        name,
        address,
      },
      userId: user,
    };

    const order = await Order.create(collectionOrder);
    await User.findByIdAndUpdate(user, {
      $addToSet: {
        shopping: order._id,
        products: idProduct,
      },
    });
    return res.status(200).json("order");
  } catch (error) {
    throw new Error(error);
  }
};
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(400).json("Order update not found");
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const removeOrder = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const order = await Order.findOneAndDelete(id);
    return res.status(200).json({ message: "Xóa đơn hàng thành công", order });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
