const { Server } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const aiService = require('../services/ai.service')
const messageModel = require('../models/message.model')

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
            // messagePlayload = {content: "Hello", chat: "chatId"}

            try {
                console.log(messagePlayload);

                await messageModel.create({
                    chat: messagePlayload.chat,
                    user: socket.user._id,
                    content: messagePlayload.content,
                    role: "user"
                })

                const response = await aiService.generateResponse(messagePlayload.content);


                await messageModel.create({
                    chat: messagePlayload.chat,
                    user: socket.user._id,
                    content: response,
                    role: "model"
                })

                socket.emit("ai-response", {
                    content: response,
                    chat: messagePlayload.chat
                });
            } catch (err) {
                console.error("AI Service Error:", err);
            }
        });
    })
}

module.exports = initSocketServer