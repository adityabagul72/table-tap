import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageTables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/owner/tables', {
        headers: { 'x-auth-token': token }
      });
      setTables(response.data);
    };

    fetchTables();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Tables</h2>
      <ul>
        {tables.map((table) => (
          <li key={table._id} className="mb-2">
            {table.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTables;