const wx = require('../helpers/wx')
const dayu = require('../helpers/dayu')
const Replyer = require('../middleware/msgReply')
const XmlParse = require('../middleware/xmlParse')
const Token = require('../helpers/WXTokenHelper')
const sign = require('../helpers/sign')
const request = require('request')
const config = require('../helpers/config')

const Client = require('../models/client')
const Vehicle = require('../models/vehicle')
var count = 0
var timelineCount = 0
var groupCount = 0
var singleCount = 0
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
exports.shareret = async (ctx, next) => {
    ctx.response.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf5a4243b7b09ffc0&redirect_uri=http://www.bl1000.cn/wx/share&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
}
exports.share = async (ctx, next) => {

    let webtoken = await dayu.getWebToken(ctx.query.code)
    let userinfo = await dayu.webGetUserinfo(
        webtoken.body.access_token,
        webtoken.body.openid
    )

    await ctx.render('index', {
        title: '涿州车友',
        headimg: userinfo.body.headimgurl,
        nick: userinfo.body.nickname,
        userinfo: userinfo.body
    });
}
exports.weatherCount = async (ctx, next) => {
    await ctx.render('weathercount',{
        count,
        timelineCount,
        groupCount,
        singleCount
    })
}
exports.weather = async (ctx, next) => {
    const from = ctx.query.from
    if(from == 'timeline'){
        timelineCount += 1;
    }
    if(from == 'groupmessage'){
        groupCount += 1
    }
    if(from == 'singlemessage'){
        singleCount += 1
    }
  count += 1
  console.log('🚨🏎🏎🏎🏎🏎🏎🏎🏎🏎 ' + count)
  await ctx.render('weather',{
    title:'涿州出行'
  })
}

exports.success = async (ctx, next) => {

  await ctx.render('success', {
      title: '设置成功',
  });
}

exports.registClient = async (ctx, next) => {
    console.log('接受到' + JSON.stringify(ctx.request.body))
    var userinfo = ctx.request.body.userinfo
    const result = await Client.findOneAndUpdate({
        openid: userinfo.openid
    }, {
        $set: {
            openid: userinfo.openid,
            nickname: userinfo.nickname,
            sex: userinfo.sex,
            city: userinfo.city,
            province: userinfo.province,
            headimgurl: userinfo.headimgurl,
            tel: ctx.request.body.tel
        }
    }, {
        new: true,
        upsert: true
    })

    const vehicle = new Vehicle({
      plate_num:ctx.request.body.plate_num,
      vehicle_type:ctx.request.body.car_type,
      regist_date:ctx.request.body.regist_date,
      cli_expire_date:ctx.request.body.cli_date,
      gap_expire_date:ctx.request.body.gap_date,
      source:2,
      clients:[userinfo.openid]
  })

  let code = 0

    try {
        await vehicle.save()
        ctx.body = {
            code:0
        }  
    } catch (err) {
        console.log(err)
        ctx.body = {
            code:-1
        }
    }
}
