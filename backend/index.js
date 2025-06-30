const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Import DB connection
const DBconnect = require('./config/database');
DBconnect.connect();
// file upload middleware joki server pe file upload krega
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true, // Temporary files will be stored in the system's temp directory
    tempFileDir: '/tmp/', // Specify the temporary file directory
}));
  
// cloudinary pe upload krne ke liye
const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect.cloudinaryConnect(); 


// Routes
const userRoutes = require('./routes/fileUpload');
app.use('/api/v1/upload', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('<h1>File Upload Service</h1>');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
