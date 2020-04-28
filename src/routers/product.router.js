const express = require('express')
const Product = require('../model/product.model')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/products', auth, async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(201).send(product)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/products', auth, async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/products/:id', auth, async (req, res) => {
    try {
        const changes = req.body
        const product = await Product.findById(req.params.id)
        if(changes.name){
            product.name = changes.name
        }
        if(changes.price){
            product.price = changes.price
        }
        await product.save()
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/products/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        await product.remove()
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router