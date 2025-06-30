const express = require('express');
const router = express.Router();
const {login, signup} = require('../controllers/login');
const {imageUpload} = require('../controllers/fileUpload');
const { auth } = require('../middlewares/auth');
router.post('/image', auth, imageUpload);
router.get('/login',login) 
router.post('/signup', signup)

module.exports = router;