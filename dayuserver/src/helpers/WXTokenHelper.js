const Token = require('../models/token')
const config = require('./config')
const koa2Req = require('koa2-request')
const baseUrl = "https://api.weixin.qq.com/";
const Dayu = require('./dayu')
var fs = require('fs')
const WxApi = {
    accessToken: baseUrl + "cgi-bin/token?grant_type=client_credential"
}

const isValidAccessToken = (data) => {
    if (!data || !data.token || !data.expires_in) {
        return false;
    }
    // console.log(' ---- *** 比较 ***  -----' + new Date().getTime() + '----' +
    // data.expires_in)
    return new Date().getTime() < data.expires_in
        ? true
        : false;
}
const updateWebtoken = async (code) => {
    const token = await Dayu.getWebToken(code)
    return token
}
const updateTicket = async () => {
    const token = await this.getToken('token')
    let result = await Dayu.webGetTicket(token.token)
    return result
}
const updateAccessToken = async () => {
    //console.log(' ---- *** 刷新 ***  -----')
    return new Promise(async (resolve, reject) => {
        // var appId=this.appId; var appSecret=this.appSecret;
        var res = await koa2Req(
            WxApi.accessToken + "&appid=" + config.wx.appid + "&secret=" + config.wx.appSecret
        );
        var data = JSON.parse(res.body);
        console.log('updateAccessToken ---- *** ' + JSON.stringify(data) + ' ***  -----')
        data.expires_in = new Date().getTime() + (data.expires_in - 20) * 1000;
        resolve(data);
    });
}
const getAsync = async (type) => {
    //console.log('getAsync type -- ' + type)
    let result = await Token.findOne({type})

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();

    fs.appendFile(
        __dirname + '/log.txt',
        mytime + ' 同步读到的token ' + JSON.stringify(result) + '\n',
        function (err) {
            console.log('log 写入出错' + err)
        }
    )

    console.log('getTokenAsync ---> ' + JSON.stringify(result))
    return result
}

const getWebTokenSync = async (openid) => {
    let result = await Token.findOne({type: 'webtoken', openid})

    //console.log('getWebTokenSync ---> ' + JSON.stringify(result))

    return result
}

const setSync = async (type, token, expires_in, openid) => {

    console.log(
        'type -- ' + type + ' token -- ' + token + ' expires_in ' + expires_in
    )

    let find = await Token.find({})
    //console.log('find result ' + JSON.stringify(find))
    let result = await Token.updateOne({
        type: type
    }, {
        'token': token,
        'expires_in': expires_in,
        openid
    }, (err, res) => {
        if (err) {
            //console.log('Error: ' + err)
        } else {
            //console.log('Res: ' + JSON.stringify(res))
        }
    })

    //console.log('保存结果token ' +  JSON.stringify(result))
}
exports.getToken = async (type) => {
    var data = await getAsync(type)

    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    fs.appendFile(
        __dirname + '/log.txt',
        mytime + ' 第一次读到的token ' + JSON.stringify(data) + '\n',
        function (err) {
            console.log('log 写入出错' + err)
        }
    )
    console.log(' 第一次读到的token ' + JSON.stringify(data))
    if (data && data.length != 0) {
        if (!isValidAccessToken(data)) {
            console.log(' ----  无效  -----')
            data = await updateAccessToken()
            await setSync(type, data.access_token, data.expires_in)
            data = await getAsync(type)
            var myDate = new Date();
            var mytime = myDate.toLocaleTimeString();
            fs.appendFile(
                __dirname + '/log.txt',
                mytime + ' ----  无效  ----- 请求' + JSON.stringify(data) + '\n',
                function (err) {
                    console.log('log 写入出错' + err)
                }
            )
        }
    } else {
        data = await updateAccessToken()
        console.log('没有读到数据 重新请求')
        await setSync(type, data.access_token, data.expires_in)
        data = await getAsync(type)
        console.log(' ----  更新  -----' + data)
    }

    //console.log(' 返回的token ' + JSON.stringify(data))
    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    fs.appendFile(
        __dirname + '/log.txt',
        mytime + ' ----  最终返回 ----- ' + JSON.stringify(data) + '\n',
        function (err) {
            console.log('log 写入出错' + err)
        }
    )
    data = await getAsync(type)
    console.log(' 返回的token ' + JSON.stringify(data))
    return data;
}
exports.getTicket = async () => {
    let data = await getAsync('ticket')
    //console.log('第一次读到的 ticket ' + JSON.stringify(data))
    if (data && data.length != 0) {
        if (!isValidAccessToken(data)) {
            //console.log(' ----  ticket 无效  -----')
            data = await updateTicket()
            await setSync('ticket', data.body.ticket, data.expires_in)
            data = {
                token: data.body.ticket,
                expires_in: data.body.expires_in
            }
        }
    } else {
        data = await updateTicket()
        await setSync('ticket', data.body.ticket, data.expires_in)
        //console.log(' ----  更新 ticket  -----' + data)
        data = {
            token: data.body.ticket,
            expires_in: data.body.expires_in
        }
    }
    //console.log(' 返回的 Ticket ' + JSON.stringify(data))
    return data;
}
exports.getWebToken = async (ctx, next) => {
    let data = await getAsync('webtoken')
    //console.log('第一次读到的 webtoken ' + JSON.stringify(data))
    if (data && data.length != 0) {
        if (!isValidAccessToken(data)) {
            //console.log(' ----  ticket 无效  -----')
            data = await updateWebtoken(ctx.query.code)
            await setSync('webtoken', data.body.access_token, data.body.expires_in)
            data = {
                token: data.body.access_token,
                expires_in: data.body.expires_in
            }
        }
    } else {
        data = await updateWebtoken(ctx.query.code)
        await setSync('webtoken', data.body.access_token, data.body.expires_in)
        data = {
            token: data.body.access_token,
            expires_in: data.body.expires_in
        }
    }
    //console.log(' 返回的 webtoken ' + JSON.stringify(data))
    return data;
}