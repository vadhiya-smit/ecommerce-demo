const passport  = require("passport")

const googleAuth = () => async (req,res,next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("google", {scope: ["email", "profile"]}, (err, user) => {
            if(err || !user)
                return reject(err)
            if(user){
                req.user = user
            }
            resolve()
        })(req,res,next)
    }).then(() => next())
    .catch((err) => next(err))
}


module.exports = {
    googleAuth
}