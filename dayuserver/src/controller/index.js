const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')
const WeChat = require('../helpers/wechat')

exports.gethandle = async (ctx, next) => {
    const result = wx.auth(ctx)
    var wechat = new WeChat()
    const config = await wechat.getAccessToken()
    const token = JSON.parse(config)
    console.log('取到的 token  ===> ' + token.access_token)

    var result1 = await dayu.getUserlist(token.access_token)
        console.log('result ' + JSON.stringify(result1) + result1)
    if(result){
        ctx.body = ctx.query.echostr
        
    }else{
        ctx.body = {
            code:-1, msg:'meishibiedao'
        }
    }
}


exports.postHandle = (ctx, next) => {
    let msg,
        MsgType,
        result

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