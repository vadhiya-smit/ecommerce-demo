const { User } = require("../models");
const userservice = require("../services/user.services");
const catchAsync = require("../utils/catchAsync");

const getUsers = catchAsync(async (req, res) => {
    var users = await userservice.getUsers()
    res.send(users)
})

const createUser = catchAsync(async (req,res) => {
    var user = await userservice.createUser(req.body)
    res.send(user)
})

module.exports = {
    getUsers,
    createUser
}