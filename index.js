const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

const PORT=process.env.PORT || 8000;
const mongoose = require('mongoose');
const userRoutes = require('./routes/fileUpload');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/',(req,res)=>{
    res.send('<h1 >File Upload Service</h1>');
})