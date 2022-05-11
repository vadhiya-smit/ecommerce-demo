const pick = (obj,keys) => {
    const newObj = {}
    keys.map(item => {
        if(Object.prototype.hasOwnProperty.call(obj, item))
            newObj[item] = obj[item]
        else 
            newObj
    })
    return newObj
}

module.exports = pick