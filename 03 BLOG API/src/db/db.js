const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`Server connected to DB`)
        })
        .catch((err) => {
            console.error(`Server not connected to DB: ${err}`)
        })
}

module.exports = connectDB