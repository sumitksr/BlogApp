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
        type: String
    },
})
module.exports = mongoose.model('File', fileSchema);
