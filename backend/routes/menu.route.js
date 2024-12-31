const express = require('express');
const { getMenuItemsForTable, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menu.controller'); // Import all functions
const router = express.Router();

// Route for fetching menu items for a specific table. Dynamic route to get items for each table
router.get('/:tableID', getMenuItemsForTable);

// Route for creating a new menu item
router.post('/add', createMenuItem);

// Route for updating an existing menu item
router.put('/update/:id', updateMenuItem);

// Route for deleting a menu item
router.delete('/delete/:id', deleteMenuItem);

module.exports = router;
