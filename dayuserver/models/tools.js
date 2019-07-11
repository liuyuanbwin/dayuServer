var md5 = require('md5')

exports.MD5 = function(val){
    /*return new Promise((resolve, reject) => {
        var passSolt = md5(val)
        resolve(passSolt)
    })*/
    return md5(val)
}