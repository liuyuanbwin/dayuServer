const koa2Req = require('koa2-request')
const BASE_URL = 'https://api.weixin.qq.com/cgi-bin'
var request = require('request')
const WeChat = require('../helpers/wechat')

var wechat = new WeChat()
var token = wechat.getAccessToken()

const post = (aurl, method, data) => {
    let url = BASE_URL + aurl 
    return new Promise((resolve, reject) => {
        request({
            url, 
            method, 
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

exports.postModelMsg = (data) => {
    return post('/message/template/send?access_token=' + token,'post' ,data)
}
exports.getUserlist = (token) => {
    return post('/user/get?access_token=' + token,'get','')
}
