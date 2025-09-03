const express = require('express')
const { registerController, loginController, logoutController, profileController } = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/register', registerController)
router.get("/login", loginController)
router.delete("/logout", logoutController)
router.get("/profile", authMiddleware, profileController)



module.exports = router