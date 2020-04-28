const express = require('express')
const Width = require('../model/width.model')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/width', auth, async (req, res) => {
    const width = new Width(req.body)
    try {
        await width.save()
        res.status(201).send(width)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/widths', auth, async (req, res) => {
    try {
        const widths = await Width.find()
        res.status(200).send(widths)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/width/:id', auth, async (req, res) => {
    try {
        const widths = await Width.find({ owner: req.params.id })
        res.status(200).send(widths)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/width/:id', auth, async (req, res) => {
    try {
        const changes = req.body
        const width = await Width.findById(req.params.id)
        if(changes.measure){
            width.measure = changes.measure
        }
        if(changes.owner){
            width.owner = changes.owner
        }
        await width.save()
        res.status(200).send(width)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/width/:id', auth, async (req, res) => {
    try {
        const width = await Width.findById(req.params.id)
        await width.remove()
        res.status(200).send(width)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router