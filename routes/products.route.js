const {productModel} = require('../models/product.model')
const express = require('express')
const {auth} = require('../middleware/auth.middleware')

const productRouter = express.Router()

productRouter.use(auth)

productRouter.get('/', async(req, res)=> {
    try {
        const products = await productModel.find()
        res.status(201).send(products)
    } catch (error) {
        res.status(400).send({"message": error});
    }
})

productRouter.post('/add', async(req, res)=> {
    try {
        const product = new productModel({
            ...req.body
        })
        await product.save()
        res.status(200).send({"message": "product has been added !"})
    } catch (error) {
        res.status(400).send({"message": error})
    }
})

module.exports = {
    productRouter
}