const productModel = require('../models/product.model')

async function createProduct(req, res) {
    try {
        const { name, description, price, stock, category } = req.body
        const product = await productModel.create({
            name, description, price, stock, category
        })
        res.status(201).json({ message: "product Created successfully", product })
    } catch (err) {
        return res.status(500).json({ message: `Error while createing the product- ${err.message}` })
    }
}

async function getProduct(req, res) {
    try {
        const product = await productModel.find()
        res.status(200).json({ message: "All products fetched sussfully", product })
    } catch (err) {
        return res.status(500).json({ message: `Error while fetcing all products- ${err.message}` })
    }
}

async function getProductById(req, res) {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) return res.status(404).json({ message: "Invalid Id" })
        res.status(200).json({ message: `Product fetched successfully`, product })
    } catch (err) {
        return res.status(500).json({ message: `Server Error- ${err.message}` })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const update = req.body
        const updatedPoduct = await productModel.findByIdAndUpdate(id, update, { new: true, runValidators: true })
        // console.log(updatedPoduct)
        if (!updateProduct) return res.status(404).json({ message: `Product Not found` })
        res.status(200).json({ message: `Product updated successfully`, updatedPoduct })
    } catch (err) {
        return res.status(500).json({ message: `Server Error- ${err.message}` })
    }
}

async function deleteProduct(req, res) {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Product Deleted successfully" })
    } catch (err) {
        return res.status(500).json({ message: `SErver Error- ${err.message}` })
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}