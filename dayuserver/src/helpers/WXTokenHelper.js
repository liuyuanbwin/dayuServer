const Token = require('../models/token')


exports.getAsync = async (type) => {
    let result = await Token.findOne({
        type
    })

    console.log('getTokenAsync ---> ' + JSON.stringify(result))
    return result.token 
}

exports.setSync = async (type, token, expirein) => {
    let result = await Token.where({
        type
    }).update({
        token,
        expirein
    })

    console.log('保存结果token ' +  JSON.stringify(resultl))
}