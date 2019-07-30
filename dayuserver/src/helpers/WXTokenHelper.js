const Token = require('../models/token')

const baseUrl="https://api.weixin.qq.com/";
const WxApi={
    accessToken:baseUrl+"cgi-bin/token?grant_type=client_credential"
}
class WeChat{
    constructor(opts){
        this.appId=opts.appId;
        this.appSecret=opts.appSecret;
        this.getAccessToken=opts.getAccessToken;
        this.saveAccessToken=opts.saveAccessToken;
        this.init();//初始化
    }

    async init(){
        //获取access_token
        let data=await this.getAccessToken();
        //判断读取的内容是否存在、是否为空字符串，如果是的话进行更新
        if(data && data.length!=0){
            data=JSON.parse(data);
            //判断是否合法
            if(!this.isValidAccessToken(data)){
                data=await this.updateAccessToken();
            }
        }else{
            data=await this.updateAccessToken();
        }
        this.access_token=data.access_token;
        this.expires_in=data.expires_in;
        this.saveAccessToken(JSON.stringify(data));
    }

    isValidAccessToken(data){
        if(!data || !data.access_token || !data.expires_in){
            return false;
        }
        return new Date().getTime() < data.expires_in ?  true : false;
    }

    updateAccessToken(){
        return new Promise(async (resolve,reject)=>{
            var appId=this.appId;
            var appSecret=this.appSecret;
            var res = await koa2Req(WxApi.accessToken+"&appid="+appId+"&secret="+appSecret);
            var data=JSON.parse(res.body);
            data.expires_in=new Date().getTime() + (data.expires_in-20)*1000;
            resolve(data);    
        });
    }
}

exports.getAsync = async (type) => {
    let result = await Token.findOne({
        type
    })

    console.log('getTokenAsync ---> ' + JSON.stringify(result))
    return result.token 
}

exports.setSync = async (type, token, expirein) => {
    let result = await Token.where({
        type
    }).update({
        token,
        expirein
    })

    console.log('保存结果token ' +  JSON.stringify(resultl))
}