const express = require('express');
const { createOrder } = require('../controllers/order.controller'); // Import the createOrder function
const router = express.Router();
const Razorpay = require('razorpay');
const Order = require('../models/order.model');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create', async (req, res) => {
  const { items, totalAmount } = req.body;
  const options = {
    amount: totalAmount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "receipt#1",
  };
  const order = await razorpay.orders.create(options);
  const newOrder = new Order({
    items,
    totalAmount,
    paymentId: '',
    orderId: order.id,
    status: 'created',
  });
  await newOrder.save();
  res.json({ orderId: order.id });
});

router.post('/payment', async (req, res) => {
  const { orderId, paymentId } = req.body;
  const order = await Order.findOne({ orderId });
  order.paymentId = paymentId;
  order.status = 'paid';
  await order.save();
  res.json({ message: 'Payment successful' });
});

// Route for creating a new order
router.post('/add', createOrder);

module.exports = router;