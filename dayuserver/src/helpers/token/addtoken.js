const jwt = require('jsonwebtoken')
const serect = 'leolau'
module.exports = (userinfo) => {
    const token = jwt.sign({
        user:userinfo.user,
        id:userinfo.id
    }, serect, {expiresIn: '6h'})
    return token
}