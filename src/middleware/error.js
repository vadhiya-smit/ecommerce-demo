
const { default: mongoose } = require("mongoose")
const logger = require("../config/winston")
const ApiError = require("../utils/ApiError")
const httpStatus = require('http-status');


const createApiError = (err, req, res, next) => {
    var error = err
    if (!(error instanceof ApiError)) {
        var statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
        var message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message)
    }
    next(error)
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    res.status(err.statusCode).send({
        code: err.statusCode,
        message: err.message
    })
    //next()
}

module.exports = { createApiError, errorHandler }