const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true,
        trim: true
    },
    cel: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        type: String,
        required: false,
        trim: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    grain: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Grain'
    },
    width: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Width'
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Quote = new mongoose.model('Quote', quoteSchema)

module.exports = Quote