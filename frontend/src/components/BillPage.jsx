import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const BillPage = () => {
  const location = useLocation();
  const { fullName, email, contact, cartItems, totalAmount, tableID } = location.state ;
  
  useEffect(() => {
    // Function to post the bill data
    const postBillData = async () => {
        try {
          const response = await axios.post("http://localhost:5000/api/userbill/bill", {
            fullName,
            email,
            contact,
            cartItems,
            totalAmount,
            tableID
          });
          console.log("Thanks for ordering, " + response.data.fullName);
        } catch (error) {
          console.error("Error posting bill data:", error);
        }
      }
      postBillData();
  }, [])

  return (
    <div className="p-10 min-h-screen" style={{ background: 'linear-gradient(to bottom, #1E293B 80% ,#FFA500 10%,)', fontFamily: 'Poppins, sans-serif' }}>
      <h1 className="text-3xl font-semibold mb-8 text-center text-[#1B1833]">Bill Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <p className='text-center'><strong>Table Number:</strong> {tableID}</p>
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <h2 className="text-xl font-semibold mt-6 mb-4">Order Details</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="mb-2">
              <span>{item.name}</span> - <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-6">Total Amount: ₹{totalAmount}</h2>
        <div className="text-center mt-8">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillPage;
