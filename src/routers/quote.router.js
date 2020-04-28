const express = require('express')
const Quote = require('../model/quote.model')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/quote', auth, async (req, res) => {
    const quotes = new Quote({
        ...req.body,
        seller: req.user._id})
    try {
        await quotes.save()
        res.status(201).send(quotes)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/quotes', auth, async (req, res) => {
    try {
        const quotes = await Quote.find()
        res.status(200).send(quotes)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/quote', auth, async (req, res) => {
    try {
        const quotes = await Quote.find({ seller: req.user._id})
        res.status(200).send(quotes)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/quote/:id', auth, async (req, res) => {
    try {
        const changes = req.body
        const quotes = await Quote.findById(req.params.id)
        if(changes.measure){
            quotes.measure = changes.measure
        }
        if(changes.owner){
            quotes.owner = changes.owner
        }
        await quotes.save()
        res.status(200).send(quotes)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/quote/:id', auth, async (req, res) => {
    try {
        const quotes = await Quote.findById(req.params.id)
        await quotes.remove()
        res.status(200).send(quotes)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router