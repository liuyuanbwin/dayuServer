const router = require('koa-router')()
router.prefix('/api/menu')

router.get('/', async(ctx, next) => {
    ctx.body ={
        msg:"kfskkfkskf"
    }
})

module.exports = router