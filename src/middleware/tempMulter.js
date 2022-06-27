const httpStatus = require("http-status")
const multer = require("multer")
const ApiError = require("../utils/ApiError")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "temp/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    console.log("file : ", file)
    if (file && (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png")) {
        cb(null, true)
    } else {
        cb(new ApiError(httpStatus.BAD_REQUEST, "file type error"), false)
    }
}

const upload2 = multer({
    storage,
    fileFilter
})


module.exports = upload2
