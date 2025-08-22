const express = require('express')
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/:id', getUserProfile)
router.put('/:id', updateUserProfile)

module.exports = router
