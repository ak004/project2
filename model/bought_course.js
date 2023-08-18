var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

bought_course_Schema = new Schema({
  
    title: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        default: ""
    }, 
    completd_course: {
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
    module_id: {
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
 
const bought_course = mongoose.model("bought_course",  bought_course_Schema)
module.exports = bought_course;