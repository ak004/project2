var mongoose = require('mongoose');
var Schema = mongoose.Schema;

page_Schema = new Schema({
  
    name: {
        type: String,
        require:true
    },
    icon: {
        type: String,
        default: ""
    }, 
    url: {
        type: String,
        require:true
    }, 
    menu_id: {
        type: mongoose.Types.ObjectId,
        require:true
    },
    menu_name: {
        type: String,
        default: ""
    },
    status: {
        type:Number,
        default: 2
    }, 
    created_at: {
        type: Date,
        default: Date.now,
      },
});

page_Schema.index({
    name: 1
}, {
    background: true
});
 
const page = mongoose.model("page",  page_Schema)
module.exports = page;