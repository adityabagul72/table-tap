import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/owner/dashboard', {
          headers: { 'x-auth-token': token }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/admin/login');
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
    toast.error('Logged out successfully', { duration: 2000 });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h2>
        {data ? (
          <div>
            <p>{data.msg}</p>
            <p>Welcome, {data.owner.name}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;