const koa2Req = require('koa2-request')
const BASE_URL = 'https://api.weixin.qq.com/cgi-bin'
const WEB_BASE_URL = 'https://api.weixin.qq.com/sns'
var request = require('request')
const config = require('../helpers/config')
    
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

exports.postModelMsg = async (token, data) => {

    return post('/message/template/send?access_token=' + token,'post' ,data)
}
exports.getUserlist = async (token) => {

    return post('/user/get?access_token=' + token,'get')
}

exports.getClientBaseInfo = async (token, openid) => {

    return post('/user/info?access_token=' + token + '&openid=' + openid + '&lang=zh_CN', 'get')
}

exports.getWebToken = async (code) => {
    return webRequest('/oauth2/access_token?appid=' + config.wx.appid + '&secret=' + config.wx.appSecret + '&code=' + code + '&grant_type=authorization_code')
}

exports.checkWebToken = async (token, openid) => {
    return webRequest('/auth?access_token=' + token + '&openid=' + openid)
}

exports.webGetUserinfo = async (token, openid) => {
    return webRequest('/userinfo?access_token=' + token + '&openid=' + openid + '&lang=zh_CN')
}