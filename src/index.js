const app = require("./app")
const mongoose = require("mongoose")
const config = require("./config/config")

mongoose.connect(config.mongoUrl).then(() => {
    console.log("connected to mongo");
    app.listen(config.port, () => {
        console.log(`server running on http://localhost:${config.port}`);
    })
})