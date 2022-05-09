const express = require("express")
const { userController } = require("../../controller")
const { validateUser } = require("../../joi/useJoiSchema")
const router = express.Router()

router.route("/")
    .get(userController.getUsers)
    .post(validateUser,userController.createUser)

module.exports = router