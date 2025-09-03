const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 4
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
},
    { timestamps: true }
)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel