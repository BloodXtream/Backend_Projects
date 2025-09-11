const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controller')
const authMiddleware = require('../middlewares/auth.middlewares')

router.post('/', authMiddleware.authUser, chatController.createChat)

module.exports = router