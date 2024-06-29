// Define the log schema
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
const logSchema = new mongoose.Schema({
     
        request:{
            type: Object,
        },
        response: {
            type: Object,
        },
        timestamp: {
        type: Date,
        default: Date.now
        }
    });

    // Create the log model
    const Log = mongoose.model('Log', logSchema);

    module.exports = Log;