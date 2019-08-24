const router = require('koa-router')()
const Dayu = require('../../helpers/dayu')
const Token = require('../../helpers/WXTokenHelper')
router.prefix('/api/menu')

router.get('/', async(ctx, next) => {
    let token = await Token.getToken('token')
    let result = await Dayu.getMenuInfo(token.token)
    console.log('menu ---> ' + JSON.stringify(result))
    ctx.body = result
})

router.post('/create', async(ctx, next) => {
    let token = await Token.getToken('token')
    let result = await Dayu.createMenu(token.token, {
        "button":[
         {
              "name":"🚘交通违章",
              "sub_button":[
                {	
                    "type":"media_id",
                    "name":"🔍违章查询",
                    "media_id": "9mDA4XPsO5S964M3J-mq_XkEsWlz0k7lDd5TtmkaKa0"
                 },
               {	
                "type":"media_id",
                "name":"💰罚款缴费",
                "media_id": "9mDA4XPsO5S964M3J-mq_YlLDcA67PPlY5jFVflLV1M"
             },
            ]
          },
          
          {
            "type":"miniprogram",
            "name":"💳同城卡券",
            "url":"http://www.bl1000.cn/wx/weather",
            "appid":"wx122013c737c2033f",
            "pagepath":"pages/index/index"
        },
        {	
            "type":"view",
            "name":"🈲今日限行",
            "url":"http://www.bl1000.cn/wx/weather"
         }
        
        
        ]
    })
    console.log('menu ' + JSON.stringify(result))
    ctx.body = result
})



module.exports = router