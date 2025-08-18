const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // Exclude password from queries by default
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields 
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;