function isAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") next()
    else return res.status(403).json({ message: "Admins Only...!" })
}

module.exports = isAdmin