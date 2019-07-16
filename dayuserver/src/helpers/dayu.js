const koa2Req = require('koa2-request')
const BASE_URL = 'https://api.weixin.qq.com/cgi-bin'
var request = require('request')

const post = (aurl, data) => {
    let url = BASE_URL + aurl 
    return new Promise((resolve, reject) => {
        request({
            url, 
            method: 'post', 
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body:data
        }, function (error, response, body){
            if (error) {
                reject(error)
            }

            resolve(response)
        })
    })
}

exports.postModelMsg = (token, data) => {
    return post('message/template/send?access_token=' + token, data)
}
exports.getUserlist = (token) => {
    return post('/user/get?access_token=', + token)
}
