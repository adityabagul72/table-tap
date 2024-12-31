const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  totalAmount: { type: Number, required: true },
  paymentId: { type: String },
  orderId: { type: String, required: true },
  status: { type: String, default: 'created' },
});

module.exports = mongoose.model('Order', OrderSchema);