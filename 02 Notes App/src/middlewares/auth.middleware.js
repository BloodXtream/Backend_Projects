const jwt = require('jsonwebtoken')


async function authMiddleware(req, res, next) {
    try {
        console.log('Token from cookie:', req.cookies.token);
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authMiddleware;