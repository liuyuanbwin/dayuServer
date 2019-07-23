const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')
const WeChat = require('../helpers/wechat')
const Replyer = require('../middleware/msgReply')
const XmlParse = require('../middleware/xmlParse')

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

    await XmlParse.xmlToJson(ctx, next).then((result) => {
        console.log(' 互动消息  ---> ' + JSON.stringify(result))
        ctx.req.body = result
        Replyer.xmlReply(ctx, next)
    }).catch((e) => {
        e.status = 400
    })

    
}