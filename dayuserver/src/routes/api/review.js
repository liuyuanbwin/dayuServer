const router = require('koa-router')()
const Review = require('../../models/review')

router.prefix('/api/review')

router.get('/', async (ctx, next) => {
    var results = await Review.find({})
    ctx.status = 200
    ctx.body = {
        code:0,
        results,
        status:1
    }
})

module.exports = router