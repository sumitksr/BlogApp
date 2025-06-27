const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Import DB connection
const DBconnect = require('./config/database');
DBconnect.connect();

const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect.cloudinaryConnect(); 

// Routes
const userRoutes = require('./routes/fileUpload');
app.use('/api', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('<h1>File Upload Service</h1>');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
