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
var getTiket = async (ctx,token,url) => {
    var tiket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+token+'&type=jsapi';
  
      await request(tiket_url, function(error, response, body){
        if(!error && response.statusCode == 200){
          var data = JSON.parse(body);
  
          cache.jsapi_ticket = data.ticket;
          ctx.render('index', { 
            title: '微信分享JSSDK',
            appid: config.wx.appid,
            sign: JSON.stringify(sign(cache.jsapi_ticket,url))
          });
        }
      });
   
  };

exports.webHandle = async (ctx, next) => {
    // console.log('get ->>> ' + JSON.stringify(ctx.query))
    // let result = await dayu.getWebToken(ctx.query.code)
    // // let tokenResult = await dayu.checkWebToken(result.body.access_token, result.body.openid)
    // console.log('请求token 结果 --->' + JSON.stringify(result))

    const tokens = await Token.getToken('token')
    const token = tokens.token

    var tiket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+token+'&type=jsapi';
  
      await request(tiket_url, function(error, response, body){
        if(!error && response.statusCode == 200){
          var data = JSON.parse(body);
          console.log('ticket 返回 ' + JSON.stringify(data))
  
          let jsapi_ticket = data.ticket;
          ctx.render('index', { 
            title: '微信分享JSSDK',
            appid: config.wx.appid,
            sign: JSON.stringify(sign(jsapi_ticket,url))
          });
        }
      });
    // result = await dayu.webGetTicket(token)

    // console.log('token --->>> ' + token +'获取到的ticket ' + JSON.stringify(result))

    // ctx.render('index', { 
    //     title: '微信分享JSSDK',
    //     appid: config.wx.appid,
    //     sign: JSON.stringify(sign(result.ticket,url))
    //   });


    // let userinfo = await dayu.webGetUserinfo(result.body.access_token, result.body.openid)
    // console.log('用户信息 ---> ' + JSON.stringify(userinfo) + userinfo.body)

    // await ctx.render('index',{
    //     title:'大宇车友',
    //     headimg:userinfo.body.headimgurl,
    //     nick:userinfo.body.nickname
    // })
}
