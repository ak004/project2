var mongoose = require('mongoose');
var Schema = mongoose.Schema;

catagorySchema = new Schema({
  
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        default: ""
    },
    status: {
        type:Number,
        default: 2
    },
   image: {
    type: String,
    required: true
   },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// videoSchema.index({
//     phone: 1
// }, {
//     background: true
// });
 
const Catagory = mongoose.model("catagory",  catagorySchema)
module.exports = Catagory;