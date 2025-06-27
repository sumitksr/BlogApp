const mongoose = require('mongoose');
require('dotenv').config();
const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags:{
        type:String
    },
    email: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('file', fileSchema);
