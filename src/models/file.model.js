const { Schema, model } = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");


const fileSchema = new Schema({
    file : {
        type : Object,
        filename: {
            type: String,
            required: true
        },
        path : {
            type: String,
            required: true
        },
    },
    thumbnail: {
        type : Object,
        filename: {
            type: String,
            required: true
        },
        path : {
            type: String,
            required: true
        },
    },
    // thumbnailpath: {
    //     type: String,
    // }
},
    {
        timestamps: true,
    })

fileSchema.plugin(toJSON)

const fileModel = model("files", fileSchema)

module.exports = fileModel


