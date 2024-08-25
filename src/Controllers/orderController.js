// controllers/orderController.js
const Order = require('../Models/orderModels');

const createOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, userId: req.user.id });
    await order.save();
    return res.status(201).json({msg: "Order added successfully",order});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('productList.productId', 'name price');
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('productList.productId', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json({ msg: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createOrder,getOrderById,getAllOrdersForUser, updateOrderStatus,deleteOrder,
}