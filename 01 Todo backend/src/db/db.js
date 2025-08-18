const mongoose = require('mongoose');
require('dotenv').config();

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
}

module.exports = connectToDB;   