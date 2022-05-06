const express = require("express")
const morgalMiddleware = require("./config/morgan")
const allV1Route = require("./routes/v1")

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended : true}))

app.use(morgalMiddleware)

app.use("/v1",allV1Route)

module.exports = app