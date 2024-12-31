const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart.model');

router.get('/', async (req, res) => {
  const cartItems = await CartItem.find();
  res.json(cartItems);
});

router.post('/', async (req, res) => {
  const newItem = new CartItem(req.body);
  await newItem.save();
  res.json(newItem);
});

router.delete('/:id', async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item removed from cart' });
});

module.exports = router;