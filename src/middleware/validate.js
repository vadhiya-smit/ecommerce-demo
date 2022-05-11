const httpStatus = require("http-status")
const Joi = require("joi")
const ApiError = require("../utils/ApiError")
const pick = require("../utils/pick")

const validate = (schema) => (req,res,next) => {
    var schemaPrototype = pick(schema, ["body", "params", "query"])
    var object = pick(req,Object.keys(schemaPrototype))
    const {error, value } = Joi.compile(schemaPrototype).validate(object)
    if(error){
        next(new ApiError(httpStatus.BAD_REQUEST, error.details.map(item => item.message).toString()))
    }
    next()
}

module.exports = validate