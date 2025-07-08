const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://blogapp-sumitksr.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Handle preflight requests (OPTIONS)
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));


// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ File upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// ✅ Cloudinary config
const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect.cloudinaryConnect();

// ✅ DB config
const DBconnect = require('./config/database');
DBconnect.connect();

// ✅ Routes
const userRoutes = require('./routes/fileUpload');
app.use('/api/v1/upload', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('<h1>File Upload Service</h1>');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
