const httpStatus = require("http-status");
const upload = require("../middleware/multer");
const upload2 = require("../middleware/tempMulter");
const { fileService } = require("../services");
const userservice = require("../services/user.services");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs")
const getUsers = catchAsync(async (req, res) => {
    console.log(req.isAuthenticated())
    const users = await userservice.getUsers()
    res.send(users)
})

const createUser = catchAsync(async (req,res) => {
    const path = req.file.path
    //fs.writeFileSync(path,)
    const data = fs.readFileSync(path)
    fs.unlinkSync(path)
    req.file.destination = "uploads/"
    req.file.path = "uploads/"+req.file.filename
    console.log(req.file)
    fs.writeFileSync("uploads/"+req.file.filename,data)
    
    const image = await fileService.uploadFile(req)
    req.body.image = image.id
    const user = await userservice.createUser(req.body)
    res.send(user)
})

const getUser = catchAsync(async (req,res) => {
    const user =  await userservice.getUserById(req.params.id)
    res.send(user)
})

const updateUser = catchAsync(async (req,res) => {
    const updatedUser = await userservice.updateUser(req.params.id, req.body)
    res.send(updatedUser)
})

const deleteUser = catchAsync(async (req,res) => {
    const updatedUser = await userservice.deleteUser(req.params.id)
    res.status(httpStatus.NO_CONTENT).send(updatedUser)
})



module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}