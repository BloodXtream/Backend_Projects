const { Server } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {})

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "")
        if (!cookies.token) {
            next(new Error("Authentiaction error: No token provided"))
        }
        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
            const user = await userModel.findById(decoded.id)
            socket.user = user
            next()
        } catch (err) {
            next(new Error(`Authentiaction error: Invalid Token-${err}`))
        }
    })

    io.on("connection", (socket) => {
        socket.on("ai-message", async (messagePlayload) => {
            console.log(messagePlayload)
        })
    })
}

module.exports = initSocketServer