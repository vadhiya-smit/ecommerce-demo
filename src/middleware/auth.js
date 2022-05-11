const httpStatus = require("http-status")
const passport = require("passport")
const { roleRights } = require("../config/role")
const ApiError = require("../utils/ApiError")

const authCallback = (requestedRights, resolve, reject) => (err, user) => {
    const userRights = roleRights.get(user.role)
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"))
    }
    if (requestedRights.length > 0) {
        const isValid = requestedRights.every(item => userRights.includes(item))
        if (!isValid) {
            return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"))
        }
    }

    return resolve()
}

var auth = (...requestedRights) => (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("jwt", { session: false }, authCallback(requestedRights, resolve, reject))(req, res, next)
    }).then(() => next())
        .catch(err => next(err))
}

module.exports = auth