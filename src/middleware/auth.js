const httpStatus = require("http-status")
const  passport  = require("passport")
const ApiError = require("../utils/ApiError")

const authCallback = (resolve,reject) => (err, user) => {
    console.log(err, user)
        if(err || !user){
            return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"))
        } 
    return resolve()
}

var auth = () => (req,res,next) => {
    return new Promise((resolve,reject) => {
        passport.authenticate("jwt", {session : false}, authCallback(resolve, reject))(req, res, next)
    }).then(() =>  next())
    .catch(err => next(err))
    //next()
}

module.exports = auth