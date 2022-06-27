const objectId = (value, helper) => {
    const regex = /^[0-9a-fA-F]{24}$/
    if(!value.match(regex))
        return helper.message("Userid must be valid object id")
    return value
}

const password = (value,helper) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if(value.length < 7)
        return helper.message("Password length must be 7")
    if(!value.match(regex))
        return helper.message("Password must contain at least a number and special character")
}

module.exports = {
    objectId,
    password
}