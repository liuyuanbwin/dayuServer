const Token = require('../models/token')
const config = require('./config')
const koa2Req = require('koa2-request')
const baseUrl="https://api.weixin.qq.com/";
const Dayu = require('./dayu')
const WxApi={
    accessToken:baseUrl+"cgi-bin/token?grant_type=client_credential"
}

const isValidAccessToken = (data) => {
    if(!data || !data.token || !data.expires_in){
        return false;
    }
    console.log(' ---- *** 比较 ***  -----' + new Date().getTime() + '----' + data.expires_in)
    return new Date().getTime() < data.expires_in ?  true : false;
}
const updateTicket = async () => {
    const token = await getToken('token')
    let result = await Dayu.webGetTicket(token.token)
    return result
}
const updateAccessToken = async () =>{
    console.log(' ---- *** 刷新 ***  -----')
    return new Promise(async (resolve,reject)=>{
        // var appId=this.appId;
        // var appSecret=this.appSecret;
        var res = await koa2Req(WxApi.accessToken+"&appid="+config.wx.appid+"&secret="+config.wx.appSecret);
        var data=JSON.parse(res.body);
        console.log(' ---- *** '+ JSON.stringify(data)+' ***  -----')
        data.expires_in=new Date().getTime() + (data.expires_in-20) * 1000;
        resolve(data);    
    });
}
const getAsync = async (type) => {
    console.log('getAsync type -- ' + type)
    let result = await Token.findOne({
        type
    })

    console.log('getTokenAsync ---> ' + JSON.stringify(result))
    return result
}

const setSync = async (type, token, expires_in) => {

    console.log('type -- ' + type + ' token -- ' + token + ' expires_in ' + expires_in)

    let find = await Token.find({})
    console.log('find result ' + JSON.stringify(find))
    let result = await Token.updateOne({type:type},{
        'token':token,
        'expires_in':expires_in
    },(err, res) => {
        if(err){
            console.log('Error: ' + err)
        }else{
            console.log('Res: ' + JSON.stringify(res))
        }
    })

    console.log('保存结果token ' +  JSON.stringify(result))
}
exports.getToken = async (type) => {
    let data = await getAsync(type)
    console.log(' 第一次读到的token ' + JSON.stringify(data))
    if(data && data.length != 0){
        if(!isValidAccessToken(data)){
            console.log(' ----  无效  -----')
            data = await updateAccessToken()
            await setSync(type, data.access_token, data.expires_in)
        }
    }else{
        data = await updateAccessToken()
        await setSync(type, data.access_token, data.expires_in)
        console.log(' ----  更新  -----' + data)
    }
    
    console.log(' 返回的token ' + JSON.stringify(data))
    return data;
}
exports.getTicket = async () => {
    let data = await getAsync('ticket')
    console.log('第一次读到的 ticket ' + JSON.stringify(data))
    if(data && data.length != 0){
        if(!isValidAccessToken(data)){
            console.log(' ----  ticket 无效  -----')
            data = await updateTicket()
            await setSync('ticket', data.ticket, data.expires_in)
        }
    }else{
        data = await updateTicket()
            await setSync('ticket', data.ticket, data.expires_in)
            console.log(' ----  更新 ticket  -----' + data)
    }
    console.log(' 返回的 Ticket ' + JSON.stringify(data))
    return data;
}