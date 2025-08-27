const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { addComment, dltComment } = require('../controllers/comment.controller')
const router = express.Router()

router.post('/posts/:id/comments', authMiddleware, addComment)
router.delete('/comments/:id', dltComment)

module.exports = router