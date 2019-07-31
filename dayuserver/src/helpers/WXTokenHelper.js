const Token = require('../models/token')
const config = require('./config')
const koa2Req = require('koa2-request')
const baseUrl="https://api.weixin.qq.com/";
const WxApi={
    accessToken:baseUrl+"cgi-bin/token?grant_type=client_credential"
}
// class WeChat{
//     constructor(opts){
//         this.appId=opts.appId;
//         this.appSecret=opts.appSecret;
//         this.getAccessToken=opts.getAccessToken;
//         this.saveAccessToken=opts.saveAccessToken;
//         this.init();//初始化
//     }

//     async init(){
//         //获取access_token
//         let data=await this.getAccessToken();
//         //判断读取的内容是否存在、是否为空字符串，如果是的话进行更新
//         if(data && data.length!=0){
//             data=JSON.parse(data);
//             //判断是否合法
//             if(!this.isValidAccessToken(data)){
//                 data=await this.updateAccessToken();
//             }
//         }else{
//             data=await this.updateAccessToken();
//         }
//         this.access_token=data.access_token;
//         this.expires_in=data.expires_in;
//         this.saveAccessToken(JSON.stringify(data));
//     }

//     isValidAccessToken(data){
//         if(!data || !data.access_token || !data.expires_in){
//             return false;
//         }
//         return new Date().getTime() < data.expires_in ?  true : false;
//     }

//     updateAccessToken(){
//         return new Promise(async (resolve,reject)=>{
//             var appId=this.appId;
//             var appSecret=this.appSecret;
//             var res = await koa2Req(WxApi.accessToken+"&appid="+appId+"&secret="+appSecret);
//             var data=JSON.parse(res.body);
//             data.expires_in=new Date().getTime() + (data.expires_in-20)*1000;
//             resolve(data);    
//         });
//     }
// }
const isValidAccessToken = (data) => {
    if(!data || !data.access_token || !data.expires_in){
        return false;
    }
    return new Date().getTime() < data.expires_in ?  true : false;
}
const updateAccessToken = async () =>{
    return new Promise(async (resolve,reject)=>{
        // var appId=this.appId;
        // var appSecret=this.appSecret;
        var res = await koa2Req(WxApi.accessToken+"&appid="+config.wx.appid+"&secret="+config.wx.appSecret);
        var data=JSON.parse(res.body);
        data.expires_in=new Date().getTime() + (data.expires_in-20)*1000;
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
    // let result = await Token.where({
    //     'type':type
    // }).updateOne({
    //     token:token,
    //     expires_in:expires_in
    // })

    let find = await Token.find({type:'token'})
    console.log('find result ' + JSON.stringify(find))
    let result = await Token.updateOne({type:'token'},{
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
exports.getToken = async () => {
    let data = await getAsync('token')
    console.log(' 第一次读到的token ' + JSON.stringify(data))
    if(data && data.length != 0){
        if(!isValidAccessToken(data)){
            console.log(' ----  无效  -----')
            data = await updateAccessToken()
        }
    }else{
        data = await updateAccessToken()
        console.log(' ----  更新  -----')
    }
    await setSync('token', data.access_token, data.expires_in)
    console.log(' 返回的token ' + JSON.stringify(data))
    return data;
}