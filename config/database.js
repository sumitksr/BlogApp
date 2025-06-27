const mongoose= require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL ;
exports.connect= ()=>{
    mongoose.connect(DB_URL, {
    }).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.error('Database connection failed:', err);
    });
}