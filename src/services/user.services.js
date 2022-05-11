const httpStatus = require("http-status")
const { Users } = require("../models")
const ApiError = require("../utils/ApiError")

const getUsers = async () => {
    const users = await Users.find()
    return users
}

const getUserById = async (id) => {
    const user = await Users.findById(id)
    if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, "User not found with id")
    return user
}

const createUser = async (body) => {
    if (await Users.isEmailTaken(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, "Email id already taken")
    return await Users.create(body)
}

const updateUser = async (id, body) => {
    const user = await Users.findById(id)
    if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, "User not found with id")
    if (await Users.isEmailTaken(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, "Email id already taken")
    Object.assign(user, body)
    await user.save()
    return user
}

const deleteUser = async (id) => {
    const user = await Users.findById(id)
    if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, "User not found with id")
    user.isDeleted = true
    await user.save()
    return user
}






module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}