const dotenv = require("dotenv")
dotenv.config({path : "./.env.dev"})

var config = {
    port : process.env.PORT,
    mongoUrl : process.env.MONGODB_URL
}

module.exports = config