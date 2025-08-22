const express = require('express')
const { registerController, loginController, logoutController } = require('../controllers/auth.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/register', registerController)
router.post('/login', authMiddleware, loginController)
router.post('/logout', logoutController)

module.exports = router