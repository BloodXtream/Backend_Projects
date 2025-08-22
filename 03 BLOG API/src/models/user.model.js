const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    bio: {
        type: String
    }
},
    { timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

module.exports = userModel