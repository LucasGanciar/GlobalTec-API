const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user.router')
const productRouter = require('./routers/product.router')
const grainRouter = require('./routers/grain.router')
const widthRouter = require('./routers/width.router')
const quoteRouter = require('./routers/quote.router')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(grainRouter)
app.use(widthRouter)
app.use(quoteRouter)

module.exports = app