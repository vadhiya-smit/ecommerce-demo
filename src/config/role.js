const roleSchema = {
    user : [],
    seller : [],
    admin : []
}

const roles = Object.keys(roleSchema)
const roleRights = new Map(Object.entries(roleSchema))

module.exports = {
    roles,
    roleRights
}