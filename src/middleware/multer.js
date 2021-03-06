const httpStatus = require("http-status")
const multer = require("multer")
const ApiError = require("../utils/ApiError")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
})

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "temp/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if (file && (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png")) {
        cb(null, true)
    } else {
        cb(new ApiError(httpStatus.BAD_REQUEST, "file type error"), false)
    }
}

const upload = multer({
    storage,
    fileFilter
})


module.exports = upload
