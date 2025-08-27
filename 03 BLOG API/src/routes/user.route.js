const express = require('express')
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/:id', authMiddleware, getUserProfile)
router.put('/:id', authMiddleware, updateUserProfile)

module.exports = router
