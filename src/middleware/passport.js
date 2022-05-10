const httpStatus = require("http-status");
const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../config/config");
const tokenTypes = require("../config/token");
const { getUserById } = require("../services/user.services");
const ApiError = require("../utils/ApiError");


const jwtOptions = {
    secretOrKey: config.jwt.secrateKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, cb) => {
    try {
        if (payload.type !== tokenTypes.ACCESS)
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token type")
        const user = await getUserById(payload.user)
        if (!user) 
           return cb(null, false)
        cb(null, user)
    } catch (error) {
        cb(error, false)
    }
}

const jwtStretegy = new Strategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStretegy
}