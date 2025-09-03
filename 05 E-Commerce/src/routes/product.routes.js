const express = require('express')
const { createProduct, getProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller')
const isAdmin = require('../middlewares/product.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createProduct)
router.get('/', getProduct)
router.get('/:id', getProductById)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)

module.exports = router