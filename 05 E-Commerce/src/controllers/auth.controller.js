const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerController(req, res) {
    try {

        const { username, email, password, role } = req.body

        const isUserExist = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if (isUserExist) {
            return res.status(400).json({
                message: "Username or Email allready Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            role
        })

        res.status(201).json({
            message: "User registered successfully"
        })
    }
    catch (err) {
        res.status(500).json({ message: `Error while registering user ${err.message}` })
    }
}

async function loginController(req, res) {
    try {
        const { identifier, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username: identifier },
                { email: identifier },
            ]
        })

        if (!user) {
            return res.status(404).json({ message: "user not found..." })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("token", token)

        res.status(200).json({ message: "User loggedIn successFully" })

    } catch (err) {
        res.status(500).json({ message: `Error while login: ${err.message}` })
    }
}

async function logoutController(req, res) {
    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "Logout SUccessfully" })
    } catch (err) {
        return res.status(500).json({ message: `Error while logout- ${err}` })
    }
}

async function profileController(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        return res.status(500).json({ message: `error while fetching profile- ${err}` })
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    profileController
}

