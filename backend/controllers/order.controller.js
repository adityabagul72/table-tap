const Order = require('../models/order.model'); // Import the Order model

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { tableID, items, paymentId, orderId } = req.body; // Extract data from the request body

    // Validate the input
    if (!tableID || !items || items.length === 0 || !orderId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => total + item.quantity * item.menuItem.price, 0);

    // Create a new order
    const newOrder = new Order({
      tableID,
      items,
      totalAmount,
      paymentId,
      orderId
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder); // Respond with the created order
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

module.exports = { createOrder };