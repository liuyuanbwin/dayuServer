const koa2Req = require('koa2-request')
const BASE_URL = 'https://api.weixin.qq.com/cgi-bin'

const post = (url, data) => {
    let url = BASE_URL + url 
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

postModelMsg:(token, data) => {
    return post('message/template/send?access_token=' + token, data)
}
getUserlist:(token) => {
    return post('/user/get?access_token=', + token)
}
module.exports = {
    postModelMsg,
    getUserlist
}