import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const CartPage = ({ cartItems, removeFromCart }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const razorpayKey = import.meta.env.REACT_APP_RAZORPAY_KEY_ID; // Use environment variable

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleRemove = (item) => {
    axios.delete(`http://localhost:5000/api/cart/${item._id}`)
      .then(() => {
        removeFromCart(item);
      })
      .catch(error => console.error('Error removing item from cart:', error));
  };

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post('http://localhost:5000/api/order/create', {
        items: cartItems,
        totalAmount
      });
      const { orderId } = orderResponse.data;

      const options = {
        key: razorpayKey, // Access environment variable correctly
        amount: totalAmount * 100,
        currency: "INR",
        name: "Table Tap",
        description: "Test Transaction",
        order_id: orderId,
        handler: async (response) => {
          const paymentId = response.razorpay_payment_id;
          await axios.post('http://localhost:5000/api/order/payment', {
            orderId,
            paymentId
          });
          alert('Payment successful');
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-slate-900" style={{ background: 'linear-gradient(to bottom, #1E293B 80% ,#FFA500 10%,)', fontFamily: 'Poppins, sans-serif' }}>
      <h1 className="text-3xl font-semibold mb-8 text-center text-white">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-white">Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item, index) => (
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
                      onClick={() => handleRemove(item)}
                    >
                      <FaTrash className="mr-2" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold text-white">Total: ₹{totalAmount}</h2>
            <button
              className="bg-green-600 font-semibold px-4 py-2 rounded-xl text-white mt-4"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;