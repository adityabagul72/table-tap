import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ManageTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tables/get-qr', {
          headers: { 'x-auth-token': token }
        });
        setTables(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching tables');
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleGenerateQR = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/tables/generate-qr', {}, {
        headers: { 'x-auth-token': token }
      });
      setTables(response.data);
      toast.success('QR codes generated successfully');
    } catch (error) {
      toast.error('Error generating QR codes');
    }
  };
  
  return (
    <div>
      <Toaster />
      <h2 className="text-2xl font-semibold mb-4">Manage Tables</h2>
      <button onClick={handleGenerateQR} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Generate QR Codes</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tables.map((table) => (
            <li key={table._id} className="mb-4">
              <div className="flex items-center">
                <span className="mr-4">{table.tableID}</span>
                {table.qrCodeURL && (
                  <img src={table.qrCodeURL} alt={`QR code for ${table.tableID}`} className="w-16 h-16" />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const generateTableQRs = async (req, res) => {
    try {
        const tables = [
            { tableID: 'Table1' },
            { tableID: 'Table2' },
            { tableID: 'Table3' },
            { tableID: 'Table4' },
            { tableID: 'Table5' },
            { tableID: 'Table6' },
            { tableID: 'Table7' },
            { tableID: 'Table8' },
            { tableID: 'Table9' },
            { tableID: 'Table10' },
            { tableID: 'Table11' },
            { tableID: 'Table12' },
        ];

        const savedTables = [];

        for (const table of tables) {
            try {
                const url = `http://localhost:5173/menu/${table.tableID}`; // Correct URL with port 5173
                const qrCodeURL = await generateQRCode(url); // Generate QR code

                // Update or create the table with the new QR code URL
                const updatedTable = await Table.findOneAndUpdate(
                    { tableID: table.tableID },
                    { qrCodeURL },
                    { new: true, upsert: true }
                );
                savedTables.push(updatedTable);
            } catch (innerError) {
                console.error(`Error generating QR code for table ${table.tableID}:`, innerError);
                res.status(500).json({ error: `Error generating QR code for table ${table.tableID}` });
                return;
            }
        }

        res.status(201).json(savedTables); // Return saved tables with QR code URLs
    } catch (error) {
        console.error('Error generating QR codes:', error);
        res.status(500).json({ error: 'Error generating QR codes' });
    }
};

export default ManageTables;