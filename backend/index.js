const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 8000;

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://blogapp-sumitksr.vercel.app'
];

// CORS config
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight OPTIONS request
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// File upload config
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Cloudinary and MongoDB setup
const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();

const { connect } = require('./config/database');
connect();

// Routes
const userRoutes = require('./routes/fileUpload');
app.use('/api/v1/upload', userRoutes);

// Health-check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.send('<h1>File Upload Service Running</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT} - ${new Date().toISOString()}`);
});
