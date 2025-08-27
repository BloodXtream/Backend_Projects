const express = require('express')
const { createPost, getAllPost, getPostById, updatePost } = require('../controllers/post.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/', authMiddleware, createPost)
router.get('/', getAllPost)
router.get('/:id', authMiddleware, getPostById)
router.put('/:id', authMiddleware, updatePost)




module.exports = router