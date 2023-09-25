var mongoose = require('mongoose');
var Schema = mongoose.Schema;

menu_Schema = new Schema({
  
    name: {
        type: String,
        require:true
    },
    icon: {
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

menu_Schema.index({
    name: 1
}, {
    background: true
});
 
const menu = mongoose.model("menu",  menu_Schema)
module.exports = menu;