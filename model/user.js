var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

userschema = new Schema({
  
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    dob: {
        type: Date,
        default: null
    },
    martial_status: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique:true
    },
    user_name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: String,
    status: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "user"
    },
 
    token: {
        type: String,
        default:""
    },
 
    type: {
        type: Number,
        default: 0
    },
   
    picture: String,
    
 
    created_at: {
        type: Date,
        default: Date.now
    }
});


 
userschema.index({
    phone: 1
}, {
    background: true
});
 

//Create a Schema method to compare password 
userschema.methods.comparePassword = function(passwords) {
    return bcrypt.compareSync(passwords, this.password);
}
const User = mongoose.model("user",  userschema)
module.exports = User;