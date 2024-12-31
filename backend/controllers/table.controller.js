const Table = require('../models/table.model');
const { generateQRCode } = require('../utils/qrcode.utils');

// Generate QR codes for all tables
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
        ];

        const savedTables = [];

        for (const table of tables) {
            try {
                // Check if the table already exists in the database
                const existingTable = await Table.findOne({ tableID: table.tableID });
                if (existingTable) {
                    console.log(`Table ${table.tableID} already exists. Skipping QR code generation.`);
                    continue; // Skip to the next table
                }
                const url = `http://localhost:5173/menu/${table.tableID}`; // Correct URL with port 5173
                const qrCodeURL = await generateQRCode(url); // Generate QR code
                const newTable = new Table({ tableID: table.tableID, qrCodeURL });
                savedTables.push(await newTable.save());
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

// Fetch QR codes for all tables
const getAllTableQRs = async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables); // Return all tables and their QR codes
    } catch (error) {
        res.status(500).json({ error: 'Error fetching QR codes' });
    }
};

module.exports = { generateTableQRs, getAllTableQRs };
