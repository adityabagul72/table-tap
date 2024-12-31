const QRCode = require('qrcode');

const generateQRCode = async (url) => {
    try {
        const qrCodeURL = await QRCode.toDataURL(url); // Generate QR code as Base64
        return qrCodeURL;
    } catch (error) {
        throw new Error('Error generating QR code');
    }
};

module.exports = { generateQRCode };
