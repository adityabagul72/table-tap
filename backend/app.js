const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser'); 
require('dotenv').config(); 

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow frontend from localhost:5173
}));
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(bodyParser.json()); // Middleware to parse JSON requests

// Routes
const tableRoutes = require('./routes/table.route'); // Table routes
const menuRoutes = require('./routes/menu.route'); // Menu routes
const cartRoutes = require('./routes/cart.route'); // Cart routes
const orderRoutes = require('./routes/order.route'); // Order routes
const ownerRoutes = require('./routes/owner.route'); // Owner routes
const userBillRoutes = require('./routes/userbill.route')  // user bill form 

app.use('/api/tables', tableRoutes) // Routes for tables (QR codes, etc.)
app.use('/api/menu', menuRoutes) // Routes for menu items
app.use('/api/cart', cartRoutes) // Routes for cart items
app.use('/api/order', orderRoutes) // Routes for orders
app.use('/api/owner',ownerRoutes) // Routes for owner
app.use('/api/userbill',userBillRoutes) //Routes for userBill form

// Start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Error connecting to the database', err);
    process.exit(1);
});
