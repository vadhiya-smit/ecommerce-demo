const httpStatus = require("http-status");
const logger = require("../config/winston");
const { authService, tokenService, userService, emailService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req,res) => {
    var user = await userService.createUser(req.body)
    var tokens = await tokenService.genrateAuthToken(user)
    await emailService.sendRegisterEmail(user.name, user.email)
    res.send({user, tokens})
})

const login = catchAsync(async (req,res) => {
    var user = await authService.login(req.body)
    var tokens = await tokenService.genrateAuthToken(user)
    res.send({user, tokens})
})

const googleLogin = catchAsync(async (req,res) => {
    var user = await userService.createAuthUser(req.body)
    var tokens = await tokenService.genrateAuthToken(user)
    res.send({user, tokens})
})

const logout = catchAsync(async (req,res) => {
    await authService.logout(req.body.refreshToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const refreshToken = catchAsync(async (req,res) => {
    const tokens = await authService.refreshToken(req.body.refreshToken)
    res.send(tokens)
})

const googleAuth = catchAsync(async (req,res) => {
    console.log("from call : ",req.user)

    res.send("call")
})

const googleCallback = catchAsync(async (req,res) => {

    const user = await userService.createAuthUser(req.user)
    const token = await tokenService.genrateAuthToken(user)
    res.send({user,token})
    // console.log(Object.keys(req))
    // console.log("from callback : ",req.user)
    // res.send("callback done")
})

const forgotPassword = catchAsync(async (req,res) => {
    
})

const resetPassword = catchAsync(async (req,res) => {
    
})

module.exports = {
    register,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    googleCallback,
    googleAuth,
    googleLogin
}