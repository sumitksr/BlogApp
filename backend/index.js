console.log('Loading express...');
const express = require('express');

console.log('Loading dotenv...');
require('dotenv').config();

console.log('Loading cors...');
const cors = require('cors');

console.log('Loading cookieParser...');
const cookieParser = require('cookie-parser');

console.log('Loading express-fileupload...');
const fileUpload = require('express-fileupload');

console.log('Creating app...');
const app = express();

console.log('Setting up CORS...');
app.use(cors({
  origin: ["http://localhost:3000", "https://blogapp-sumitksr.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

console.log('Setting up express.json...');
app.use(express.json());

console.log('Setting up cookieParser...');
app.use(cookieParser());

console.log('Setting up fileUpload...');
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

console.log('Connecting to database...');
const { connect } = require('./config/database');
connect();

console.log('Connecting to cloudinary...');
const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();

console.log('Loading routes...');
const userRoutes = require('./routes/fileUpload');
app.use('/api/v1/upload', userRoutes);

console.log('Setting up health check...');
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    time: new Date().toISOString(),
    uptime: process.uptime()
  });
});

console.log('Setting up root route...');
app.get('/', (req, res) => {
  res.send('<h1>File Upload Service Running</h1>');
});

console.log('Starting server...');
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
