const express = require("express")
const { userController } = require("../../controller")
const { validateUser } = require("../../joi/useJoiSchema")
const auth = require("../../middleware/auth")
const router = express.Router()

router
    .route("/")
    .get(auth(),userController.getUsers)
    .post(validateUser,userController.createUser)

router
    .route("/:id")
    .get(userController.getUser)

module.exports = router