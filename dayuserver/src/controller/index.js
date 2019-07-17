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
    let msg,
        MsgType,
        result

    

    console.log('   -----   postHandle ----------')
    await next()
    msg = ctx.req.body ? ctx.req.body.xml : ''
    if (!msg) {
        ctx.body = 'error request.'
        return;
    }
    
    MsgType = msg.MsgType[0]

    switch (MsgType) {
        case 'text':
            result = wx.message.text(msg, msg.Content)
            break;
        default: 
            result = 'success'
    }
    ctx.res.setHeader('Content-Type', 'application/xml')
    ctx.res.end(result)
}