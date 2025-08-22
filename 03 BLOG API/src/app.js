const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.route')
const userRouter = require('../src/routes/user.route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

module.exports = app