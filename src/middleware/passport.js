const httpStatus = require("http-status");
const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../config/config");
const tokenTypes = require("../config/token");
const { getUserById } = require("../services/user.services");
const ApiError = require("../utils/ApiError");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function extractProfile(profile) {
    //console.log(profile)
    let imageUrl = "";
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }
    return {
        id: profile.id,
        name: profile.displayName,
        image: imageUrl,
        email : profile.emails[0].value
    };
}

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

const googleConfig = {
    clientID: config.google.clientId,
    clientSecret: config.google.secrate,
    callbackURL: config.google.redirect,
    //userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback   : true
}

const googleVerify = (request, accessToken, refreshToken, profile, cb) => {
    //console.log(accessToken, refreshToken)
    cb(null, extractProfile(profile));
}

const googleStretegy = new GoogleStrategy(googleConfig,googleVerify)

module.exports = {
    jwtStretegy,
    googleStretegy
}