const morgan = require("morgan")
const logger = require("./winston")

var stream = {
    write: (message) => logger.http(message)
}

const format = ":method :url :status :res[content-length]  :response-time ms"

const skip = () => {
    return false
}

const morgalMiddleware = morgan(format, {
    stream,
    skip
})

module.exports = morgalMiddleware
