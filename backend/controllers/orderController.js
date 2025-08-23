import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id, // Assuming the frontend sends the full product object with _id
        _id: undefined // Prevent mongoose from creating a new _id for the sub-document
      })),
      user: req.user._id, // From the 'protect' middleware
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    // Ensure only the user who placed the order or an admin can view it
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized to view this order' });
    }
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

export { addOrderItems, getOrderById, getMyOrders };