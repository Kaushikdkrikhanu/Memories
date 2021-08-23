import express from 'express'
import { getPosts, createPosts, updatePosts, deletePosts, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/',getPosts)
router.post('/',auth,createPosts)
router.put('/:id',auth,updatePosts)
router.delete('/:id',auth,deletePosts)
router.put('/:id/likePost',auth,likePost)
export default router