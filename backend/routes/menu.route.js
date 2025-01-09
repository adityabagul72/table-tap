const express = require('express');
const { addMenuToAllTables,getAllMenuItems,getMenuItemsForTable, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menu.controller'); // Import all functions
const router = express.Router();

// Route for adding a menu item to all tables
router.post('/add-to-all', addMenuToAllTables);

// Route for fetching menu items for a specific table. Dynamic route to get items for each table
router.get('/:tableID', getMenuItemsForTable);

// Route for fetching all menu items
router.get('/', getAllMenuItems);

// Route for creating a new menu item
router.post('/add', createMenuItem);

// Route for updating an existing menu item
router.put('/update/:id', updateMenuItem);

// Route for deleting a menu item
router.delete('/delete/:id', deleteMenuItem);

module.exports = router;
