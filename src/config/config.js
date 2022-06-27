const dotenv = require("dotenv")
dotenv.config({path : "./.env.dev"})

var config = {
    port : parseInt(process.env.PORT),
    mongoUrl : process.env.MONGODB_URL,
    domainUrl : process.env.DOMAIN_URL,
    jwt : {
        secrateKey : process.env.JWT_SECRATE,
        tokenExpiteTime : parseInt(process.env.TOKEN_EXPIRE_TIME_IN_MINUTE),
        refreshTokenExpiteTime : parseInt(process.env.REFRSH_TOKEN_EXPIRE_TIME_IN_DAY),
    },
    smtp : {
        config : {
            host : process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            auth : {
                user : process.env.SMTP_USERID,
                pass : process.env.SMTP_PASSWORD,
            }
        },
        from : process.env.FROM_EMAIL,
    },
    google : {
        clientId : process.env.GOOGLE_CLIENT_ID,
        secrate : process.env.GOOGLE_SECRATE,
        redirect : process.env.GOOGLE_REDIRECT_URL,
    }
}

module.exports = config