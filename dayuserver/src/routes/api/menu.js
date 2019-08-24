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

module.exports = router