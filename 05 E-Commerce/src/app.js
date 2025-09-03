const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const cartRoutes = require('./models/cart.model')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

module.exports = app