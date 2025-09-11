const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        const { fullName: { firstName, lastName }, email, password } = req.body

        const isUserAlredayExist = await userModel.findOne({ email })

        if (isUserAlredayExist) return res.status(400).json({ message: "Email already Exist..." })


        const hashPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            fullName: { firstName, lastName },
            email,
            password: hashPassword
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(201).json({
            message: "User registered successfully",
            user: {
                email: user.email,
                fullName: user.fullName,
                _id: user._id
            }
        })

    } catch (err) {
        res.status(500).json({ message: `Server Error: ${err}` })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!email) return res.status(400).json({ message: "Invalid Email or Passwrod" })

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Email or Passwrod" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(201).json({
            message: "User LoggedIn sucessfully...",
            user: {
                email: user.email,
                fullName: user.fullName,
                _id: user._id
            }
        })
    } catch (err) {
        res.status(500).json({ message: `Server Error: ${err}` })
    }
}

module.exports = {
    registerUser,
    loginUser
}