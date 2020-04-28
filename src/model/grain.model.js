const mongoose = require('mongoose')

const grainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
}, {
    timestamps: true
})

const Grain = new mongoose.model('Grain', grainSchema)

module.exports = Grain