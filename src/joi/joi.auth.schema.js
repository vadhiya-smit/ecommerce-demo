const Joi = require("joi");
const { password } = require("./custom.validation");

const registerSchema = {
    body: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    })
}

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    })
}

const logoutSchema = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const forgotPasswordSchema = {
    body: Joi.object().keys({
        email: Joi.string().required().email()
    })
}

const resetPasswordSchema = {
    query: Joi.object().keys({
        token: Joi.string().required()
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password)
    })
}

module.exports = {
    registerSchema,
    loginSchema,
    logoutSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}