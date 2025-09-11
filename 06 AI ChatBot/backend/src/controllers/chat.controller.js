const chatModel = require('../models/chat.model')

async function createChat(req, res) {
    try {
        const { title } = req.body
        const user = req.user

        const chat = await chatModel.create({
            user: user._id,
            title,
        })

        res.status(201).json({
            message: "Chat Created Successfully",
            chat: {
                _id: chat._id,
                title: chat.title,
                lastActivity: chat.lastActivity
            }
        })
    } catch (err) {
        res.status(500).json({ message: `Server Error: ${err}` })
    }
}

module.exports = {
    createChat,
}