const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://blogapp-sumitksr.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

const { connect } = require('./config/database');
connect();

const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();


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
