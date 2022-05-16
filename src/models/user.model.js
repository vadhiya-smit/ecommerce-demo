const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const toJSON = require("./plugins/toJSON.plugin");
const { roles } = require("../config/role");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        private: true
    },
    role: {
        type: String,
        enum: roles,
        default: "user"
    },
    isDeleted: {
        type : Boolean,
        default: false
    }
},
    {
        timestamps: true,
    })

userSchema.plugin(toJSON)

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email: email })
    return !!user
}

userSchema.methods.isPasswordMatch = async function (password) {
    var user = this
    if(!user.password) 
        throw new ApiError(httpStatus.NOT_FOUND, "Please Login via google auth")
    return bcrypt.compare(password, user.password)
    //return bcrypt.compare(password, user.password ? user.password : Math.random().toString())
}

userSchema.pre("save", async function (next) {
    const user = this
    if((await userModel.find()).length === 0 )
        this.role = "admin"
        
    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8)
    next()
})

const userModel = model("users", userSchema)

module.exports = userModel


