import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleAddMenu = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/menu/add', {
        name,
        description,
        price,
        discount: discount || 0,
        imageURL: imageURL || ""
      }, {
        headers: { 'x-auth-token': token }
      });
      toast.success('Menu added successfully');
      setName('');
      setDescription('');
      setPrice('');
      setDiscount('');
      setImageURL('');
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('Error: No response from server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="rounded-md min-h-screen flex items-center justify-center bg-[#F0AEAE] overflow-hidden">
      <Toaster />
      <div className="w-full max-w-4xl px-10 pb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Menu</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#C4E5DF]"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#C4E5DF]"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#C4E5DF]"
          />
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#C4E5DF]"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="p-3 border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#C4E5DF]"
          />
          <button
            onClick={handleAddMenu}
            className="w-full bg-[#C4E5DF] text-black py-3 rounded-full font-semibold hover:bg-[#F0AEAE] transition duration-300"
          >
            Add Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;