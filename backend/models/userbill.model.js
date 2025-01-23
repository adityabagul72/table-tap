const mongoose = require('mongoose')

const userBillSchema = mongoose.Schema({
    tableID :{type :String,required:true},
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    cartItems :[{
        name : {type:String,required:true},
        price : {type:String,required:true}
      }],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('UserBill', userBillSchema);  