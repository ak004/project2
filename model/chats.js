var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

chatsSchema = new Schema({
  
    msg: {
        type: String,
        required: true
    },
    type_user: {
        type: String,
        default: ""
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    course_id: {
        type: mongoose.Types.ObjectId,
        default: null
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
 
const Chats = mongoose.model("chats",  chatsSchema)
module.exports = Chats;