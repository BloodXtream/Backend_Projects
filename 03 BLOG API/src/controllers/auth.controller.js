const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    try {
        const { username, email, password } = req.body
        const isUserExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists with this username or email"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username, email, password: hashPassword
        })

        res.status(201).json({
            message: "User Registered Succefully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error in Registering User",
            err
        })
    }
}

async function loginController(req, res) {
    try {
        const { identifier, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid username/ email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid username/email or password"
            })
        }

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true if you’re on https
            sameSite: 'lax'
        })


        res.status(201).json({
            message: "Login successful",
            user: { id: user._id, username: user.username, email: user.email }
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error in login",
            err
        });
    }

}

async function logoutController(req, res) {
    try {
        res.clearCookie('token')
        res.status(201).json({
            message: "Logout successfully"
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error in Logout",
            err
        })
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController
}