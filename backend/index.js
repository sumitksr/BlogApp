const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://blogapp-sumitksr.vercel.app'
  ],
  credentials: true
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Import DB connection
const { connect } = require('./config/database');
connect();

// Cloudinary connection
const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();

// Routes
const userRoutes = require('./routes/fileUpload');
app.use('/api/v1/upload', userRoutes);

// Health check and default route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});
app.get('/', (req, res) => {
  res.send('<h1>File Upload Service Running</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling for unhandled rejections and uncaught exceptions
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});