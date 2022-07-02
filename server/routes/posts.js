import express from 'express';
import {auth} from '../middleware/auth.js';
import {createPost, deletePost, likePost,getPosts, commentPost,getComments,reTweet} from '../controllers/posts.js'
import upload from '../helpers/fileHelper.js';

const router = express.Router();

router.get('/',auth, getPosts);
router.post('/', auth, upload.single('file'), createPost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likepost',auth, likePost);
router.patch('/:id/retweet',auth, reTweet);

router.patch('/:id/comments', auth, commentPost);
router.get('/:id/comments',auth,getComments)

export default router