// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');

// const app = express();
// const PORT = process.env.PORT || 8000;

// // Middleware
// app.use(express.json());
// app.use(cookieParser());




// app.use(cors({
//   origin: ["http://localhost:3000", "https://blogapp-sumitksr.vercel.app","http://blogapp-sumitksr.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/'
// }));

// // Import DB connection
// const { connect } = require('./config/database');
// connect();

// // Cloudinary connection
// const { cloudinaryConnect } = require('./config/cloudinary');
// cloudinaryConnect();

// // Routes
// const userRoutes = require('./routes/fileUpload');
// app.use('/api/v1/upload', userRoutes);

// // Health check and default route
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', time: new Date().toISOString() });
// });
// app.get('/', (req, res) => {
//   res.send('<h1>File Upload Service Running</h1>');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Error handling for unhandled rejections and uncaught exceptions
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
// });
// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err);
// });



const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const fileUpload = require('express-fileupload'); 

const app = express(); 
const PORT = process.env.PORT || 8000; 

// CORS MUST be the FIRST middleware - this is critical!
app.use(cors({ 
  origin: ["http://localhost:3000", "https://blogapp-sumitksr.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
})); 

// Handle preflight requests
app.options('*', cors());

// Other middleware AFTER CORS
app.use(express.json()); 
app.use(cookieParser()); 
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
  res.status(200).json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    uptime: process.uptime()
  }); 
}); 

app.get('/', (req, res) => { 
  res.send('<h1>File Upload Service Running</h1>'); 
}); 

// Keep server alive in production (prevents cold starts)
if (process.env.NODE_ENV === 'production') {
  const serverUrl = process.env.SERVER_URL || 'https://blogapp-yakt.onrender.com';
  
  setInterval(async () => {
    try {
      const response = await fetch(`${serverUrl}/health`);
      console.log('Keep-alive ping:', response.status);
    } catch (error) {
      console.log('Keep-alive error:', error.message);
    }
  }, 14 * 60 * 1000); // Ping every 14 minutes
}

// Start server 
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
}); 

// Enhanced error handling
process.on('unhandledRejection', (err) => { 
  console.error('Unhandled Rejection:', err); 
}); 

process.on('uncaughtException', (err) => { 
  console.error('Uncaught Exception:', err); 
});
