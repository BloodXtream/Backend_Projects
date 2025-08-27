const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.route')
const userRouter = require('../src/routes/user.route')
const postRouter = require('../src/routes/post.route')
const commentRouter = require('../src/routes/comment.route')
const uploadRouter = require('../src/routes/upload.route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api', commentRouter)
app.use('/api/upload', uploadRouter)

module.exports = app