const cartModel = require('../models/cart.model')

async function addItemToCart(req, res) {
    try {
        const userId = req.user.id
        const { productId, quantity } = req.body

        let cart = await cartModel.findOne({ userId })
        // not done yet




    } catch (err) {
        return res.status(500).json({ message: `Server Error- ${err}` })
    }
}
async function removeItemFromCart(req, res) {

}
async function getCart(req, res) {

}

module.exports = {
    addItemToCart,
    removeItemFromCart,
    getCart
}
