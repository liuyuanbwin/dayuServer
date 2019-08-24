const router = require('koa-router')
router.prefix('/api/menu')

router.length('/', async(ctx, next) => {
    ctx.body ={
        msg:"kfskkfkskf"
    }
})