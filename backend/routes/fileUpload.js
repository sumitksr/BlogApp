const express = require('express');
const router = express.Router();
const {imageUpload,imageReducerUpload,localFileUpload} = require('../controllers/fileUpload');


router.post('/image', imageUpload);
router.post('/image-reducer', imageReducerUpload);
router.post('/local-file', localFileUpload);
module.exports = router;