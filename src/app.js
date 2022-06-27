const express = require("express")
const httpStatus = require("http-status")
const passport = require("passport")
const morgalMiddleware = require("./config/morgan")
const { createApiError, errorHandler } = require("./middleware/error")
const { jwtStretegy, googleStretegy } = require("./middleware/passport")
const allV1Route = require("./routes/v1")
const ApiError = require("./utils/ApiError")
const session = require('express-session')
const cors = require("cors")

const app = express()

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(morgalMiddleware)

app.use(cors());
app.options('*', cors());

app.use(passport.initialize())
app.use(passport.session()) 

passport.use("jwt", jwtStretegy)
passport.use("google", googleStretegy)

passport.serializeUser((user, cb) => {
    cb(null, user)
})
passport.deserializeUser((user, cb) => {
    cb(null, user)
})

app.use("/v1", allV1Route)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Api url path not found"))
})

app.use(createApiError)

app.use(errorHandler)

module.exports = app