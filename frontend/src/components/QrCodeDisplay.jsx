import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QrCodeDisplay = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tables/get-qr')
            .then(response => setTables(response.data))
            .catch(error => console.error('Error fetching tables:', error));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">QR Codes for Tables</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {tables.map((table, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">{table.tableID}</h3>
                        <div className="flex justify-center items-center">
                            <img
                                src={table.qrCodeURL}
                                alt={`QR for ${table.tableID}`}
                                className="w-40 h-40 md:w-48 md:h-48 object-contain border-4 border-blue-500 rounded-lg shadow-md"
                            />
                        </div>
                        <p className="text-center text-gray-500 mt-4">Scan to view the menu</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QrCodeDisplay;
