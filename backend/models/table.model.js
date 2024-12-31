const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    tableID: {
        type: String,
        required: true,
        unique: true
    }, // e.g., "Table1"
    
    qrCodeURL: {
        type: String
    }, // Store QR code URL
});

module.exports = mongoose.model('Table', TableSchema);
