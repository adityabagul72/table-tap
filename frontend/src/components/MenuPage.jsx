import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // To access the table ID from the URL
import axios from 'axios';
import { FaShoppingCart, FaList } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

const MenuPage = ({ addToCart }) => {
  const { tableID } = useParams(); // Get the table ID from the URL
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(''); // Add an error state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the menu items for the current table
    axios.get(`http://localhost:5000/api/menu`)
      .then(response => {
        setMenuItems(response.data); // Set the menu items state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        setError('Error fetching menu items');
        setLoading(false); // Set loading to false even if there's an error
        console.error('Error fetching menu items:', err);
      });
  }, []); // Fetch menu items once when the component mounts

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading menu...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success('Menu item added to cart', { duration: 2000 });
  };

  const handleGoToCart = () => {
    navigate(`/cart?tableID=${tableID}`);
  };

  return (
    <div className="p-10 min-h-screen" style={{ background: 'linear-gradient(to bottom, #1E293B 80% ,#FFA500 10%,)', fontFamily: 'Poppins, sans-serif' }}>
      <Toaster />
      <div className="flex justify-between mb-4">
        <Link to="/menuItemList" className="font-semibold text-[#1B1833] text-lg flex items-center">
          <FaList className=" text-[#1B1833] mr-2" /> Menu Item List
        </Link>
        <button onClick={handleGoToCart} className="text-[#1B1833] font-semibold text-lg flex items-center">
          <FaShoppingCart className=" text-[#1B1833] mr-2" /> Cart
        </button>
      </div>
      <h1 className="text-3xl font-semibold mb-8 text-center text-[#1B1833]">Menus {tableID}</h1>

      {menuItems.length === 0 ? (
        <p className="text-center text-white">No menu items available for this table.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div key={index} className="text-black shadow-lg rounded-xl overflow-hidden h-92 w-72 mx-auto flex flex-col">
              <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <span className="text-lg font-bold">₹{item.price}</span>
                </div>
                <p className="rounded-md px-1 mb-4 flex-grow">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  {item.discount && (
                    <span className="font-normal bg-green-300 text-black px-1 py-1 rounded-xl">{item.discount}% Off</span>
                  )}
                  <button
                    className="bg-red-600 font-semibold px-2 py-1 rounded-xl text-white flex items-center transform transition-transform duration-300 hover:scale-105 active:scale-95"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart className="mr-2" /> Buy-Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;