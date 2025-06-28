const express = require('express');
const router = express.Router();
// const {imageUpload,videoUpload,imageReducerUpload,localFileUpload} = require('../controllers/fileUpload');
const { localFileUpload ,imageUpload} = require('../controllers/fileUpload');   


router.post('/image', imageUpload);
// router.post('/video', videoUpload);
// router.post('/image-reducer', imageReducerUpload);
router.post('/local-file', localFileUpload);
module.exports = router;