const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const userModel = require('../models/auth.model');


// Register a new user
async function registerController(req, res) {
    try {
        const { username, password } = req.body
        const isUserAlreadyExist = await userModel.findOne({ username })

        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await userModel.create({
            username,
            password: await bcrypt.hash(password, 10)
        })

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username
            }
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

// Login a existing user
async function loginController(req, res) {
    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username }).select('+password');

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username
            }
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}

// Logout user
async function logoutController(req, res) {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

// Get user profile
async function profileController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    profileController
}