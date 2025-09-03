const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        requriedL: true,
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1,
        requried: true
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        requried: true,
        unique: true,
    },
    items: [cartItemSchema]
},
    { timestamps: true }
)

const cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel