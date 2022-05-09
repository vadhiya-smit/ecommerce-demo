const httpStatus = require("http-status");
const Joi = require("joi");
const logger = require("../config/winston");
const ApiError = require("../utils/ApiError");



const userSchema = Joi.object({
    name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(7).required()
})

const validateUser = (req,res,next) => {
    const {error, value } = userSchema.validate(req.body)
    if(error){
        logger.error(error.details[0].message)
        throw new ApiError(httpStatus.BAD_REQUEST, error.details.map(item => item.message).toString());
    }
    next()
}

module.exports = {
    validateUser
}