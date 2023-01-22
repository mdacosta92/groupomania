const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../routes/private');
const like = require('../controllers/like');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth , postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/like/:id', auth, like.likePost);

module.exports = router;
