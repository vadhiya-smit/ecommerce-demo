const jwt = require("jsonwebtoken")
const moment = require("moment")
const config = require("../config/config")
const tokenTypes = require("../config/token")
const { Tokens } = require("../models")

const genrateToken = (userId, expireAt, type, secrateKey = config.jwt.secrateKey) => {
    const payload = {
        user: userId,
        iat: moment().unix(),
        exp: expireAt.unix(),
        type: type
    }
    return jwt.sign(payload, secrateKey)
}

const saveToken = async (token, user, expireAt, type) => {
    //const dbToken = await Tokens.findOne({token : token, user : userId})
    const dbToken = await Tokens.create({
        token,
        user,
        expireAt,
        type
    })

    return dbToken
}

const verifyToken = async (token) => {
    const payload = jwt.verify(token, config.jwt.secrateKey)
    if (payload.user)
        return payload
    //const dbToken = await 
}

const genrateAuthToken = async (user) => {
    const accesTokenExpireTime = moment().add(config.jwt.tokenExpiteTime, "minute")
    const accesToken = genrateToken(user.id, accesTokenExpireTime, tokenTypes.ACCESS)

    const refreshTokenExpireTime = moment().add(config.jwt.refreshTokenExpiteTime, "day")
    const refreshToken = genrateToken(user.id, refreshTokenExpireTime, tokenTypes.REFRESH)

    await saveToken(refreshToken, user.id, accesTokenExpireTime.toDate(), tokenTypes.REFRESH)

    return {
        tokens: {
            access: {
                token: accesToken,
                expireAt: accesTokenExpireTime
            },
            refreshToken: {
                token: refreshToken,
                expireAt: refreshTokenExpireTime
            }
        }
    }

}


module.exports = {
    genrateAuthToken
}