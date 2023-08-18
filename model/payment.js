var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

payment_Schema = new Schema({
  
    type: {
        type: Number,
        default: 1
    },
    user_name: {
        type: String,
        default: ""
    },  
    amount: {
        type: Number,
        default: 0
    }, 
    user_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    refrence_id: {
        type: mongoose.Types.ObjectId,
        required:true
    }, 
    status: {
        type:Number,
        default: 2
    },
  
    created_at: {
        type: Date,
        default: Date.now
    }
});

userschema.index({
    title: 1
}, {
    background: true
});
 
const payment = mongoose.model("payment",  payment_Schema)
module.exports = payment;