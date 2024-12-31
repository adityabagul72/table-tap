const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    imageURL: { type: String, default: "" },
});

module.exports = mongoose.model('CartItem', CartItemSchema);