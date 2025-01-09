import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/owner/notifications', {
        headers: { 'x-auth-token': token }
      });
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id} className="mb-2">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;