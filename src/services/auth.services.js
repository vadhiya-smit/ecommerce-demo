const httpStatus = require("http-status")
const { userService, tokenService } = require(".")
const { Users, Tokens } = require("../models")
const ApiError = require("../utils/ApiError")
const bcrypt = require("bcrypt")
const { verifyToken } = require("./token.services")
const tokenTypes = require("../config/token")


const login = async (body) => {
    const user = await Users.findOne({ email: body.email })
    if (!user || !(await user.isPasswordMatch(body.password)))
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
    return user
}

const refreshToken = async (refreshToken) => {
    try {
        const tokenData = await verifyToken(refreshToken, tokenTypes.REFRESH)
        const user = await Users.findById(tokenData.user)
        if (!user)
            throw new ApiError(httpStatus.NOT_FOUND, "User not found")
        await tokenData.remove()
        return await tokenService.genrateAuthToken(user)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
}

const logout = async (refreshToken) => {
    const tokenData = await Tokens.findOne({token : refreshToken, type : tokenTypes.REFRESH})
    if(!tokenData)
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user")
    await tokenData.remove()
}

const forgotPassword = async (email) => {

}

const resetPassword = async () => {

}


module.exports = {
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
}