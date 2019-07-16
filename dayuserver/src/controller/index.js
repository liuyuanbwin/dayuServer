const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')

exports.gethandle = async (ctx, next) => {
    const result = wx.auth(ctx)
    if(result){
        ctx.body = ctx.query.echostr
        var result1 = await dayu.getUserlist()
        console.log('result ' + JSON.stringify(result1) + result1)
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