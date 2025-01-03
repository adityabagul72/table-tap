import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QrCodeDisplay from './components/QrCodeDisplay';
import MenuPage from './components/MenuPage'; // Menu page component for each table
import HomePage from './components/HomePage'; // A simple home page component for the root path
import MenuItemList from './components/MenuItemList';
import CartPage from './components/CartPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
  };

  const handleSetToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qr-codes" element={<QrCodeDisplay />} />
        <Route path="/menu/:tableID" element={<MenuPage addToCart={addToCart} />} />
        <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
        <Route path="/menu-items" element={<MenuItemList />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/admin/login" element={<AdminLogin setToken={handleSetToken} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
