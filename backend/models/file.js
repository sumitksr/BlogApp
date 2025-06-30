const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer'); 
const fileSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },

    time:{
        type: Date,
        default: Date.now
    },
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('File', fileSchema);
