const express = require('express')
const { addItemToCart, removeItemFromCart, getCart } = require('../controllers/cart.controller')
const router = express.Router()

router.post('/add', addItemToCart)
router.post('/remove', removeItemFromCart)
router.get('/', getCart)

module.exports = router