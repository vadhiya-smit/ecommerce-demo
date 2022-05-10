const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const toJSON = require("./plugins/toJSON.plugin");
const tokenTypes = require("../config/token");

  
const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true
    },
    type: {
        type: String,
        enum : [tokenTypes.ACCESS, tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        required: true,
    },
    expireAt: {
        type : Date,
        default: false
    }
},
    {
        timestamps: true,
        // toJSON : {
        //     transform : function(doc, ret){
        //         ret.id = ret._id.toString()
        //         delete ret._id
        //         delete ret.__v
        //         delete ret.createdAt
        //         delete ret.password
        //         delete ret.updatedAt
                
        //     }
        // }
    })

tokenSchema.plugin(toJSON)


const tokenModel = model("tokens", tokenSchema)

module.exports = tokenModel


