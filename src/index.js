const app = require("./app")
const mongoose = require("mongoose")
const config = require("./config/config")
const logger = require("./config/winston")

mongoose.connect(config.mongoUrl)
.then(() => {
    logger.info("connected to mongo")
    app.listen(config.port, () => {
        logger.info(`server running on http://localhost:${config.port}`)
    })
}).catch((err) => {
    logger.error(`${err.message}`)
})