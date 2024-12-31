const express = require('express');
const router = express.Router();
const { generateTableQRs, getAllTableQRs } = require('../controllers/table.controller');

// Route to generate QR codes for tables
router.post('/generate-qr', generateTableQRs);

// Route to fetch QR codes for all tables
router.get('/get-qr', getAllTableQRs);

module.exports = router;
