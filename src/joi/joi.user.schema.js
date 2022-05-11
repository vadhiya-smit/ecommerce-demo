const httpStatus = require("http-status");
const Joi = require("joi");
const { roles } = require("../config/role");
const logger = require("../config/winston");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");
const { password, objectId } = require("./custom.validation");

const createUserSchema = {
    body: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(7).custom(password),
        role: Joi.string().required().valid(...roles)
    })
}

const updateUserSchema = {
    body: Joi.object().keys({
        name: Joi.string().min(3),
        email: Joi.string().email(),
        password: Joi.string().min(7).custom(password),
        role: Joi.string().required().valid(...roles)
    })
}

const getUserSchema = {
    params : Joi.object().keys({
        id : Joi.string().required().custom(objectId)
    })
}

const deleteUserSchema = {
    params : Joi.object().keys({
        id : Joi.string().required().custom(objectId)
    })
}

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
    deleteUserSchema
}