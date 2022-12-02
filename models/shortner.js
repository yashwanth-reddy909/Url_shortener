const mongoose = require('mongoose');
const Schema=mongoose.Schema;

var shortnerSchema= new Schema({
    orgUrl: {
        type: String,
        required: true
    },
    shortWith: {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true});

var Shortners=mongoose.model('Shortner',shortnerSchema);
module.exports=Shortners;
