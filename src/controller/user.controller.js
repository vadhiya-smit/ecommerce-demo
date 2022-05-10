const { genrateAuthToken } = require("../services/token.services");
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
    genrateAuthToken(user)
    res.send(user)
})



module.exports = {
    getUsers,
    createUser,
    getUser
}