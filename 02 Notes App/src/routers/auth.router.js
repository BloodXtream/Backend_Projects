const express = require('express');
const router = express.Router();
const { registerController, loginController, profileController, logoutController } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authMiddleware, profileController);
router.post('/logout', logoutController);


module.exports = router;