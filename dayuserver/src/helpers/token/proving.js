const jwt = require('jsonwebtoken')
const serect = 'leolau'
module.exports = (tokens) => {
    if(tokens){
        let toke = tokens.split(' ')[1]
        console.log('toke ' + toke)
        let decode = jwt.decode(toke, serect)
        console.log('decode ' + decode + 'type ' + typeof(decode))
        return decode
    }
}