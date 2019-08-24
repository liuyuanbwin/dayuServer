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
             "type":"click",
             "name":"今日歌曲",
             "key":"V1001_TODAY_MUSIC"
         },
         {
              "name":"菜单",
              "sub_button":[
              {	
                  "type":"view",
                  "name":"搜索",
                  "url":"http://www.soso.com/"
               },
               {
                    "type":"miniprogram",
                    "name":"wxa",
                    "url":"http://mp.weixin.qq.com",
                    "appid":"wx286b93c14bbf93aa",
                    "pagepath":"pages/lunar/index"
                },
               {
                  "type":"click",
                  "name":"赞一下我们",
                  "key":"V1001_GOOD"
               }]
          }]
    })
})



module.exports = router