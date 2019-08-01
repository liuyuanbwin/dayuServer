const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')
const Replyer = require('../middleware/msgReply')
const XmlParse = require('../middleware/xmlParse')
const Token = require('../helpers/WXTokenHelper')
const sign = require('../helpers/sign')
const request = require('request')
const config = require('../helpers/config')

exports.gethandle = async (ctx, next) => {
    const result = wx.auth(ctx)
    if (result) {
        ctx.body = ctx.query.echostr
    } else {
        ctx.body = {
            code: -1,
            msg: 'meishibiedao'
        }
    }
}

exports.postHandle = async (ctx, next) => {
    await XmlParse
        .xmlToJson(ctx, next)
        .then(async (result) => {
            ctx.req.body = result
            await Replyer.xmlReply(ctx, next)
        })
        .catch((e) => {
            e.status = 400
        })
    }

exports.getSign = async (ctx, next) => {
    const ticket = await Token.getTicket()
    ctx.body = sign(ticket.token, ctx.query.url)
}

exports.share = async (ctx, next) => {

    let webtoken = await dayu.getWebToken(ctx.query.code)
    let userinfo = await dayu.webGetUserinfo(webtoken.body.access_token, webtoken.body.openid)
  
    await ctx.render('index', {
      title: '涿州车友',
      headimg:userinfo.body.headimgurl,
      nick:userinfo.body.nickname,
      userinfo:userinfo.body
    });
}

exports.registClient = async (ctx, next) => {
    console.log('接受到' + JSON.stringify(ctx.request.body))
    ctx.body = {
      ok:"ok"
    }
}
