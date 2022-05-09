const httpStatus = require("http-status")
const { User } = require("../models")
const ApiError = require("../utils/ApiError")

const getUsers = async () => {
    const users = await User.find()
    return users
}   

const getUserById = async (id) => {
    const user = await User.findById(id)
    if(!user)
        throw new ApiError(httpStatus.NOT_FOUND, "User not found with id")
    return user
}

const createUser = async (body) => {
    if(await User.isEmailTaken(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, "Email id already taken")
    return await User.create(body) 
}


module.exports = {
    getUsers,
    getUserById,
    createUser
}