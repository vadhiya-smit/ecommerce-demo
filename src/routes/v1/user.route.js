const express = require("express")
const multer = require("multer")
const { userController } = require("../../controller")
const { createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema } = require("../../joi/joi.user.schema")
const auth = require("../../middleware/auth")
const upload = require("../../middleware/multer")
const upload2 = require("../../middleware/tempMulter")
const validate = require("../../middleware/validate")
const pick = require("../../utils/pick")
const router = express.Router()

const isLogin = (req,res,next) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
    next()
}

router
    .route("/")
    .get(isLogin,userController.getUsers)
    .post(upload2.single("files"),(req,res,next) => {req.body = pick(req.body, ["name","email", "password","role"]); next()},validate(createUserSchema),userController.createUser)

router
    .route("/:id")
    .get(validate(getUserSchema),userController.getUser)
    .patch(validate(updateUserSchema),userController.updateUser)
    .delete(validate(deleteUserSchema),userController.deleteUser)   

module.exports = router