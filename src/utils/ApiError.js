class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = ''){
        super(message)
        this.statusCode = statusCode
        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

module.exports = ApiError