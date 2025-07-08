const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 8000;

// ↑–– your two allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://blogapp-sumitksr.vercel.app'
];

// ✅ Globally enable CORS (includes preflight)
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Built‑in express middleware
app.use(express.json());
app.use(cookieParser());

// File‑upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Cloudinary setup
const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();

// MongoDB setup
const { connect } = require('./config/database');
connect();

// Mount your routes
const uploadRoutes = require('./routes/fileUpload');
console.log('Registering route: /api/v1/upload');
app.use('/api/v1/upload', uploadRoutes);

// A simple root endpoint
console.log('Registering route: /');
app.get('/', (req, res) => {
  res.send('<h1>File Upload Service</h1>');
});

// Start listening
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
