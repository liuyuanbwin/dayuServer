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
    let resutl = await Dayu.createMenu(token.token, {
        "button":[
         {
              "name":"交通违章",
              "sub_button":[
              {	
                  "type":"media_id",
                  "name":"交罚款",
                  "url":"http://www.soso.com/"
               },
               {	
                "type":"media_id",
                "name":"罚款缴费",
                "url":"http://www.soso.com/"
             }]
          },
          
          {
            "type":"miniprogram",
            "name":"wxa",
            "url":"http://www.bl1000.cn/wx/weather",
            "appid":"wx122013c737c2033f",
            "pagepath":"pages/lunar/index"
        },
        
        
        ]
    })

    ctx.body = result
})



module.exports = router