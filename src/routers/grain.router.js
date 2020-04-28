const express = require('express')
const Grain = require('../model/grain.model')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/grain', auth, async (req, res) => {
    const grain = new Grain(req.body)
    try {
        await grain.save()
        res.status(201).send(grain)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/grains', auth, async (req, res) => {
    try {
        const grains = await Grain.find()
        res.status(200).send(grains)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/grain/:id', auth, async (req, res) => {
    try {
        const grains = await Grain.find({ owner: req.params.id })
        res.status(200).send(grains)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/grain/:id', auth, async (req, res) => {
    try {
        const changes = req.body
        const grain = await Grain.findById(req.params.id)
        if(changes.name){
            grain.name = changes.name
        }
        if(changes.owner){
            grain.owner = changes.owner
        }
        await grain.save()
        res.status(200).send(grain)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/grain/:id', auth, async (req, res) => {
    try {
        const grain = await Grain.findById(req.params.id)
        await grain.remove()
        res.status(200).send(grain)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router