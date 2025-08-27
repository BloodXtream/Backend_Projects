const express = require('express')
const { authMiddleware } = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware')
const { uploadFile } = require('../controllers/upload.controller')
const router = express.Router()

router.post('/', authMiddleware, upload.single("file"), uploadFile)

module.exports = router