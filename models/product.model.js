const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    rating: Number,
    image: String
})

const productModel = mongoose.model('product', productSchema)

module.exports = {
    productModel
}