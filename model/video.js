var mongoose = require('mongoose');
var Schema = mongoose.Schema;

videoSchema = new Schema({
  
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
    thumb_img: {
        type: String,
        default: ""
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    module_id: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    status: {
        type:Number,
        default: 2
    },
   path: {
    type: String,
    required: true
   },
   attachments: [],
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
 
const Video = mongoose.model("video",  videoSchema)
module.exports = Video;