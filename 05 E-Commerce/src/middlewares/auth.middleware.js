const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ message: "Access Denied: No Token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(`decode:${decoded}`)
        console.log(req.user)
        next()
    } catch (err) {
        return res.status(500).json({ message: `Error while reciveing Token- ${err.message}` })
    }
}

module.exports = authMiddleware