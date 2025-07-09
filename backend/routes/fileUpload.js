const express = require('express');
const router = express.Router();
const {login, signup} = require('../controllers/login');

const {likePost, unlikePost} = require('../controllers/likeController');
const {createComment,getAllComments} = require('../controllers/commentController');
const {imageUpload, getAllPosts, getPostById, deletePost} = require('../controllers/fileUpload');
const { auth } = require('../middlewares/auth');
const { chatWithAI } = require('../controllers/chatbotController');

router.post('/image', auth, imageUpload);
router.post('/login',login) 
router.post('/signup', signup)
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/like',likePost)
router.post('/unlike', unlikePost)
router.post('/comment', createComment);
router.get('/allComments',getAllComments);

router.delete('/posts/delete/:id', deletePost);
router.post('/ai', chatWithAI);

module.exports = router;
