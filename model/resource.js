var mongoose = require('mongoose');
var Schema = mongoose.Schema;

resource_Schema = new Schema({
  
    title: {
        type: String,
        require:true
    },
    desc: {
        type: String,
        default: ""
    }, 
    extenstion: {
        type: String,
        default: ""
    }, 
    url: {
        type: String,
        require:true
    }, 
    catagory_id: {
        type: mongoose.Types.ObjectId,
        require:true
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        require:true
    },
    status: {
        type:Number,
        default: 2
    }, 
    no_download: {
        type:Number,
        default: 0
    }, 
    users_downloaded: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now,
      },
});

resource_Schema.index({
    name: 1,
}, {
    background: true
});
 
const resource = mongoose.model("resource",  resource_Schema)
module.exports = resource;