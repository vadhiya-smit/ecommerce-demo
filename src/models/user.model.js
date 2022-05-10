const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const toJSON = require("./plugins/toJSON.plugin");

  
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
        private : true
    },
    isDeleted: {
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

userSchema.plugin(toJSON)

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email: email })
    return !!user
}

userSchema.method.isPasswordMatch = async function (password) {
    var user = this
    return bcrypt.compare(password, user.password)
}

userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8)
    next()
})

const userModel = model("users", userSchema)

module.exports = userModel


