const mongoose = require('mongoose')

const widthSchema = new mongoose.Schema({
    measure: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
}, {
    timestamps: true
})

const Width = new mongoose.model('Width', widthSchema)

module.exports = Width