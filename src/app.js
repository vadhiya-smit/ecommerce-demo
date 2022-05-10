const express = require("express")
const httpStatus = require("http-status")
const  passport  = require("passport")
const morgalMiddleware = require("./config/morgan")
const { createApiError, errorHandler } = require("./middleware/error")
const { jwtStretegy } = require("./middleware/passport")
const allV1Route = require("./routes/v1")
const ApiError = require("./utils/ApiError")

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended : true}))

app.use(morgalMiddleware)

app.use(passport.initialize())
passport.use("jwt", jwtStretegy)

app.use("/v1",allV1Route)

app.use((req,res,next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Api url path not found"))
})

app.use(createApiError)

app.use(errorHandler)

module.exports = app