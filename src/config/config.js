const dotenv = require("dotenv")
dotenv.config({path : "./.env.dev"})

var config = {
    port : parseInt(process.env.PORT),
    mongoUrl : process.env.MONGODB_URL,
    jwt : {
        secrateKey : process.env.JWT_SECRATE,
        tokenExpiteTime : parseInt(process.env.TOKEN_EXPIRE_TIME_IN_MINUTE),
        refreshTokenExpiteTime : parseInt(process.env.REFRSH_TOKEN_EXPIRE_TIME_IN_DAY),
    }
}

module.exports = config