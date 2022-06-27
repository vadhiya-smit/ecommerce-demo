const express = require("express")
const { fileController } = require("../../controller")
const upload = require("../../middleware/multer")
const router = express.Router()

router.route("/").get(fileController.getFiles)

router.route("/upload").post(upload.array   ("files"),fileController.uploadFiles)

module.exports = router