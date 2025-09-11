const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authUser(req, res, next) {
    try {
        const token = req.cookies?.token
        if (!token) return res.status(401).json({ message: "Unauthorized" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({ message: `Server Error ${err}` })
    }
}

module.exports = {
    authUser
} 