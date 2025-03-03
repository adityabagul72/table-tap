import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import AddMenu from './AddMenu';
import ManageTables from './ManageTables';
import Notifications from './Notifications';
import { FaUtensils, FaTable, FaBell, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      toast.error('You cannot access this page without logging in', { duration: 1000 });
      setTimeout(() => {
        navigate('/admin/login');
      }, 1000);
    } else {
      fetchMenuItems();
    }
  }, [navigate]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      toast.error('Error fetching menu items');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/menu/delete/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setMenuItems(menuItems.filter(item => item._id !== id));
      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error('Error deleting menu item');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Toaster />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully', { duration: 4000 });
    setTimeout(() => {
      navigate('/admin/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Toaster />
      <aside className="w-64 fixed h-full rounded-tr-2xl bg-[#F0AEAE] text-white">
        <Link to="/admin/dashboard">
          <div className="p-4 cursor-pointer">
            <h2 className="text-2xl font-semibold text-black tracking-tighter">Owner's Dashboard</h2>
          </div>
        </Link>
        <nav className="mt-4 tracking-tight">
          <ul>
            <li className="p-4 tracking-tight hover:bg-[#C4E5DF] font-medium hover:text-black">
              <Link to="/admin/add-menu" className="flex items-center">
                <FaUtensils className="mr-2" /> Add Menu
              </Link>
            </li>
            <li className="p-4 tracking-tight hover:bg-[#C4E5DF] font-medium hover:text-black">
              <Link to="/admin/manage-tables" className="flex items-center">
                <FaTable className="mr-2" /> Manage Tables
              </Link>
            </li>
            <li className="p-4 tracking-tight hover:bg-[#C4E5DF] font-medium hover:text-black">
              <Link to="/admin/notifications" className="flex items-center">
                <FaBell className="mr-2" /> Notifications
              </Link>
            </li>
            <li className="p-4 tracking-tight font-medium hover:bg-[#C4E5DF] hover:text-black">
              <button onClick={handleLogout} className="flex items-center w-full text-left">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 ml-64">
        <Routes>
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="manage-tables" element={<ManageTables />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Menu Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map(item => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="font-bold">₹{item.price}</p>
                </div>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;