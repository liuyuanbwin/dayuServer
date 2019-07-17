const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')
const WeChat = require('../helpers/wechat')

exports.gethandle = async (ctx, next) => {
    const result = wx.auth(ctx)
    var wechat = new WeChat()
    const config = await wechat.getAccessToken()
    const token = JSON.parse(config)

    var result1 = await dayu.getUserlist(token.access_token)
        
    if(result){
        ctx.body = ctx.query.echostr
        
    }else{
        ctx.body = {
            code:-1, msg:'meishibiedao'
        }
    }
}


exports.postHandle = async (ctx, next) => {
    await next()
}