const MenuItem = require('../models/menuItem.model'); // Import the MenuItem model
const Table = require('../models/table.model'); // Import the Table model (assuming it exists)

// Get all menu items for a specific table
const getMenuItemsForTable = async (req, res) => {
  try {
    const { tableID } = req.params; // Extract tableID from URL
    const menuItems = await MenuItem.find({ tableID }); // Fetch items for this table

    if (menuItems.length === 0) {
      return res.status(404).json({ message: `No menu items found for table ${tableID}` });
    }
    res.status(200).json(menuItems); // Send the menu items in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Fetch all menu items
    res.status(200).json(menuItems); // Send the menu items in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, discount, imageURL } = req.body; // Extract data from the request body
    
    // Validate the input
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new menu item
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      discount: discount || 0, // Set default discount to 0 if not provided
      imageURL: imageURL || "" // Default empty string if no image URL provided
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem); // Respond with the created menu item
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating menu item', error });
  }
};

// Update an existing menu item
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params; // Extract menu item ID from URL
    const { name, description, price, discount, imageURL } = req.body; // Extract data from the request body

    // Validate the input
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and update the menu item
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, description, price, discount, imageURL },
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(updatedMenuItem); // Respond with the updated menu item
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating menu item', error });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params; // Extract menu item ID from URL

    // Find and delete the menu item
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' }); // Respond with a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};

// Add menu items to all tables
const addMenuToAllTables = async (req, res) => {
  try {
    const { name, description, price, discount, imageURL } = req.body;

    // Validate the input
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Fetch all tables
    const tables = await Table.find();

    // Create a new menu item for each table
    const menuItems = tables.map((table, index) => ({
      tableID: `Table${index + 1}`,
      name,
      description,
      price,
      discount: discount || 0, // Set default discount to 0 if not provided
      imageURL: imageURL || "" // Default empty string if no image URL provided
    }));

    // Save all menu items
    const savedMenuItems = await MenuItem.insertMany(menuItems);
    res.status(201).json(savedMenuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addMenuToAllTables, deleteMenuItem, updateMenuItem, createMenuItem, getMenuItemsForTable, getAllMenuItems };