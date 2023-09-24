var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

qr_code_sesion_Schema = new Schema({
  
    session_id: {
        type: String,
        require:true
    },
    random_number: {
        type: String,
        default: ""
    }, 
    user_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    logged_in: {
        type: Boolean,
        required:true,
        default:false
    }, 
    status: {
        type:Number,
        default: 2
    }, 
    created_at: {
        type: Date,
        default: Date.now,
        // This line creates a TTL index to automatically delete documents after a certain time
        expires: 10, // Documents will expire after 1800 seconds (30 minutes)
      },
});

qr_code_sesion_Schema.index({
    session_id: 1
}, {
    background: true
});
 
const qr_code_session = mongoose.model("qr_code_session",  qr_code_sesion_Schema)
module.exports = qr_code_session;