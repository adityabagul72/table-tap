const mongoose = require('mongoose');

// Define the schema for a menu item
const menuItemSchema = new mongoose.Schema({
  tableID: { 
    type: String, 
    required: true,
    trim: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  discount: { 
    type: Number, 
    default: 0 
  },
  imageURL: { 
    type: String, 
    default: "" 
  }
});

// Create a model based on the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
