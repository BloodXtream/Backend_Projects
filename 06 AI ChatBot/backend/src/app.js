const express = require('express')
const cookieParser = require('cookie-parser')

// routes
const authRouter = require('./routes/auth.routes')
const chatRouter = require('./routes/chat.routes')

const app = express()

// Middlewares
app.use(cookieParser())
app.use(express.json())

// using Routes
app.use("/api/auth", authRouter)
app.use("/api/chat", chatRouter)



module.exports = app