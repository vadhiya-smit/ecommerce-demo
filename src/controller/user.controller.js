const httpStatus = require("http-status");
const userservice = require("../services/user.services");
const catchAsync = require("../utils/catchAsync");

const getUsers = catchAsync(async (req, res) => {
    const users = await userservice.getUsers()
    res.send(users)
})

const createUser = catchAsync(async (req,res) => {
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