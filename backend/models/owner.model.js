const mongoose = require('mongoose');
const OwnerSchema = mongoose.Schema({
    name: 
    {
        type: String, 
        required: true 
    },
    email: 
    { 
        type: String, 
        required: true 
    },
    password: 
    { 
        type: String ,
        required: true
    },
    number: 
    { 
        type: String, 
        required: true 
    },
})

module.exports = mongoose.model('Owner', OwnerSchema);