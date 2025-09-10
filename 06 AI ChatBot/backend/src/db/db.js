const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Server connected to DB successfully')
    } catch (err) {
        console.error(`Server not connected to DB: ${err.message}`)
    }
}


module.exports = connectDB