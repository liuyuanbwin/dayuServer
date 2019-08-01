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

    // const addCarresult = await Vehicle.update({
    //   plate_num:ctx.request.body.plate_num
    // },{
    //   $addToSet:{
    //     clients:userinfo.openid,
    //     source:2,
    //     regist_date:ctx.request.body.regist_date,

    //   }
    // },{
    //   new:true,
    //   upsert:true
    // })

    console.log('更新结果 ' + JSON.stringify(result) + '  搞车结果 ' + JSON.stringify(addCarresult))

    ctx.body = {
        ok: JSON.stringify(addCarresult)
    }
}
