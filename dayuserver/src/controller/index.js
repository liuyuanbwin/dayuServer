const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')
const Replyer = require('../middleware/msgReply')
const XmlParse = require('../middleware/xmlParse')

exports.gethandle = async (ctx, next) => {
    const result = wx.auth(ctx)
    

    // var wechat = ctx.wechat
    // var token = await wechat.getAccessToken()

    // var result1 = await dayu.getUserlist(token)
        
    if(result){
        ctx.body = ctx.query.echostr
        
    }else{
        ctx.body = {
            code:-1, msg:'meishibiedao'
        }
    }
}

exports.postHandle = async (ctx, next) => {

    await XmlParse.xmlToJson(ctx, next).then(async (result) => {
        ctx.req.body = result
        await Replyer.xmlReply(ctx, next)
    }).catch((e) => {
        e.status = 400
    })
    
}

exports.webHandle = async (ctx, next) => {
    console.log('get ->>> ' + JSON.stringify(ctx.query))
    let result = await dayu.getWebToken(ctx.query.code)
    let tokenResult = await dayu.checkWebToken(result.body.access_token, result.body.openid)
    console.log('请求token 结果 --->' + JSON.stringify(tokenResult))

    let userinfo = await dayu.webGetUserinfo(result.body.access_token, result.body.openid)
    console.log('用户信息 ---> ' + JSON.stringify(userinfo) + userinfo.body)

    await ctx.render('index',{
        title:'大宇车友',
        headimg:userinfo.body.headimgurl,
        nick:userinfo.body.nickname
    })
}
