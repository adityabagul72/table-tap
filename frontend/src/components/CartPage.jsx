import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const CartPage = ({ cartItems, removeFromCart }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const razorpayKey = import.meta.env.REACT_APP_RAZORPAY_KEY_ID; // Use environment variable
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tableID = queryParams.get('tableID');
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleRemove = (item) => {
    axios.delete(`http://localhost:5000/api/cart/${item._id}`)
      .then(() => {
        removeFromCart(item);
        toast.success('Item removed from cart', { duration: 2000 });
      })
      .catch(error => console.error('Error removing item from cart:', error));
  };

  const handlePayment = async () => {
    if (!fullName || !email || !contact) {
      toast.error('Please enter all required details', { duration: 2000 });
      return;
    }

    try {
      const orderResponse = await axios.post('http://localhost:5000/api/order/create', {
        items: cartItems,
        totalAmount,
        user: {
          name: fullName,
          email: email,
          contact: contact
        }
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
          })
            .then(() => {
              toast.success('Payment successful', { duration: 2000 });
              navigate('/bill', {
                state: {
                  fullName,
                  email,
                  contact,
                  cartItems,
                  totalAmount
                }
              });
            })
            .catch(error => {
              console.error('Error during payment confirmation:', error);
              toast.error('Payment confirmation failed', { duration: 2000 });
            });
        },
        prefill: {
          name: fullName,
          email: email,
          contact: contact
        },
        theme: {
          color: "#3399cc"
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
      toast.error('Payment failed', { duration: 2000 });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    closeModal();
    handlePayment();
  };

  return (
    <div className="p-10 min-h-screen" style={{ background: 'linear-gradient(to bottom, #1E293B 80% ,#FFA500 10%,)', fontFamily: 'Poppins, sans-serif' }}>
      <Toaster />
      <div className="flex justify-between mb-4">
        <Link to={`/menu/${tableID}`} className="font-semibold text-[#1B1833] text-lg flex items-center">
          <FaArrowLeft className="text-[#1B1833] mr-2" /> Go to Menu
        </Link>
      </div>
      <h1 className="text-3xl font-semibold mb-8 text-center text-[#1B1833]">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-white">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cartItems.map((item, index) => (
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
                    onClick={() => handleRemove(item)}
                  >
                    <FaTrash className="mr-2" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold text-[#1B1833]">Total: ₹{totalAmount}</h2>
        <button
          className="bg-green-600 font-semibold px-4 py-2 rounded-xl text-white mt-4 transform transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={openModal}
        >
          Pay Now
        </button>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter Your Details
                  </Dialog.Title>
                  <form onSubmit={handleModalSubmit}>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-4 p-2 border rounded-lg w-full"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-4 p-2 border rounded-lg w-full"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Enter your contact number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="mt-4 p-2 border rounded-lg w-full"
                        required />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Proceed to Pay
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CartPage;