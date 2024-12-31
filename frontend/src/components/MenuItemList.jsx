import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const MenuItemList = ({ menuItems }) => {
  return (
    <div className="p-10 min-h-screen bg-slate-900" style={{ background: 'linear-gradient(to bottom, #1E293B 80% ,#FFA500 10%,)', fontFamily: 'Poppins, sans-serif' }}>
      <div className="flex justify-between mb-4">
        <Link to="/" className="font-semibold text-red-500 text-lg flex items-center">
          <FaArrowLeft className="text-white mr-2" /> Back to Home
        </Link>
      </div>
      <h1 className="text-3xl font-semibold mb-8 text-center text-white">Menu Items</h1>
      {menuItems.length === 0 ? (
        <p className="text-center text-white">No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white text-black shadow-lg rounded-xl overflow-hidden h-92 w-72 mx-auto flex flex-col">
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
                    className="bg-red-600 font-semibold px-2 py-1 rounded-xl text-white flex items-center"
                    onClick={() => addToCart(item)}
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
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

export default MenuItemList;