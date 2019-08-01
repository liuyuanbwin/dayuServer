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

exports.getSign  = async (ctx, next) => {

    // const tokens = await Token.getToken('token')
    // const token = tokens.token
    // result = await dayu.webGetTicket(token)

    // console.log('token --->>> ' + token +'获取到的ticket ' + JSON.stringify(result))
    const ticket = await Token.getTicket()
    ctx.body = sign(ticket.token,ctx.query.url)
}

exports.share = async (ctx, next) => {
  await ctx.render('index', { 
    title: '微信分享JSSDK',
  });
}