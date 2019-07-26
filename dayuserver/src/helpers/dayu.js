const koa2Req = require('koa2-request')
const BASE_URL = 'https://api.weixin.qq.com/cgi-bin'
const WEB_BASE_URL = 'https://api.weixin.qq.com/sns/oauth2'
var request = require('request')
const WeChat = require('../helpers/wechat')
const config = require('../helpers/config')

var wechat = new WeChat()
    
const webRequest = (wurl, method, data)=> {
    let url = WEB_BASE_URL + wurl
    return new Promise((resolve, reject) => {
        request({
            url,
            method,
            json:true,
            headers:{
                "content-type": "application/json",
            },
            body:data
        }, function(error, response, body){
            if(error) {
                reject(error)
            }

            resolve(response)
        })
    })
}

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

exports.postModelMsg = async (data) => {
    var token = await wechat.getAccessToken()
    var tkstr = JSON.parse(token)
    return post('/message/template/send?access_token=' +tkstr.access_token,'post' ,data)
}
exports.getUserlist = async () => {
    var token = await wechat.getAccessToken()
    var tkstr = JSON.parse(token)
    return post('/user/get?access_token=' + tkstr.access_token,'get')
}

exports.getClientBaseInfo = async (openid) => {
    var token = await wechat.getAccessToken()
    var tkstr = JSON.parse(token)
    return post('/user/info?access_token=' + tkstr.access_token + '&openid=' + openid + '&lang=zh_CN', 'get')
}

exports.getWebToken = async (code) => {
    return webRequest('/access_token?appid=' + config.wx.appid + '&secret=' + config.wx.appSecret + '&code=' + code + '&grant_type=authorization_code')
}
