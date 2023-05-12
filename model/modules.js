var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

moduleSchema = new Schema({
  
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        default: ""
    },
    duration: {
        type: String,
        default: ""
    },
    no_of_vids: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    status: {
        type:Number,
        default: 2
    },
    bought_users: [],
  
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
 
const Modules = mongoose.model("modules",  moduleSchema)
module.exports = Modules;