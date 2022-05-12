const express = require("express")
const { authController } = require("../../controller")
const { registerSchema, loginSchema, logoutSchema, forgotPasswordSchema, resetPasswordSchema } = require("../../joi/joi.auth.schema")
const { googleAuth } = require("../../middleware/googleAuth")
const validate = require("../../middleware/validate")
const router = express.Router()
const passport = require('passport')
    
router.route("/register").post(validate(registerSchema),authController.register)
router.route("/login").post(validate(loginSchema),authController.login)
router.route("/logout").post(validate(logoutSchema),authController.logout)
router.route("/refresh-token").post(validate(logoutSchema),authController.refreshToken)
router.route("/forgot-password").post(validate(forgotPasswordSchema),authController.forgotPassword)
router.route("/reset-password").post(validate(resetPasswordSchema),authController.resetPassword)


//router.route("/google/auth").get(googleAuth(),authController.googleAuth)
router.route("/google/callback").get(googleAuth(),authController.googleCallback)


module.exports = router