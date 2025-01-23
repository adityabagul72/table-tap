const userbillModel = require('../models/userbill.model.js');

const createUserBill = async (req, res) => {
    try {
        const { tableID, fullName, email, contact, cartItems, totalAmount } = req.body;

        const userData = await userbillModel.create({
            tableID,
            fullName,
            email,
            contact,
            cartItems,
            totalAmount
        });

        res.status(201).json(userData);  
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while saving details");
    }
};


const getUserBills = async (req, res) => {
    try {
        const userBills = await userbillModel.find();
        res.status(200).json(userBills);  
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ message: 'Error fetching bills', error });  // Set status before response
    }
};

const getUserBillById = async (req, res) => {
    try {
        const userBill = await userbillModel.findById(req.params.id);

        if (!userBill) {
            return res.status(404).json({ message: "Bill Not Found" });  
        }
        res.status(200).json(userBill);
    } catch (error) {
        console.error('Error fetching bill:', error);
        res.status(500).json({ message: 'Error fetching the bill', error });  
    }
};

module.exports = {
    getUserBills,
    createUserBill,
    getUserBillById
};
