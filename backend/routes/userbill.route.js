const express = require('express')
const router = express.Router()

const {getUserBills,createUserBill,getUserBillById} = require('../controllers/userbill.controller.js')

//router while payment sending userModel
router.post('/bill',createUserBill)

//This is for getting all bills
router.get('/bills',getUserBills);

//particular bill information
router.get('/bill/:id',getUserBillById)


module.exports = router;