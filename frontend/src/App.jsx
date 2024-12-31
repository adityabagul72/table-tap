import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QrCodeDisplay from './components/QrCodeDisplay';
import MenuPage from './components/MenuPage'; // Menu page component for each table
import HomePage from './components/HomePage'; // A simple home page component for the root path
import MenuItemList from './components/MenuItemList';
import CartPage from './components/CartPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
  };

  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomePage />} /> {/* Home page for the root path */}
        
        {/* Route for the QR codes */}
        <Route path="/qr-codes" element={<QrCodeDisplay />} /> 
        
        {/* Route for each table's menu */}
        <Route path="/menu/:tableID" element={<MenuPage addToCart={addToCart} />} />

        {/* Route for menuItemLists */}
        <Route path="/menuItemList" element={<MenuItemList />} />

        {/* Route for each cart page  */}
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
