const express =require("express")
const router = express.Router()

const userRoute = require("./user.route")
const authRoute = require("./auth.route")
const fileRoute = require("./file.route")

router.use("/auth",authRoute)
router.use("/users",userRoute)
router.use("/files",fileRoute)

module.exports = router