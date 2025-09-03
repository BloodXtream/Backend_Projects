const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`DB connected to server`)
        })
        .catch((err) => {
            console.error(`Error while connecting the DB: ${err}`)
        })
}

module.exports = connectToDb