const express = require("express")
const { userController } = require("../../controller")
const { createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema } = require("../../joi/joi.user.schema")
const auth = require("../../middleware/auth")
const validate = require("../../middleware/validate")
const router = express.Router()

const isLogin = (req,res,next) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
    next()
}

router
    .route("/")
    .get(isLogin,userController.getUsers)
    .post(validate(createUserSchema),userController.createUser)

router
    .route("/:id")
    .get(validate(getUserSchema),userController.getUser)
    .patch(validate(updateUserSchema),userController.updateUser)
    .delete(validate(deleteUserSchema),userController.deleteUser)   

module.exports = router