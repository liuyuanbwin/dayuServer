const router = require('koa-router')()
const Review = require('../../models/review')

router.prefix('/api/review')

router.get('/', async (ctx, next) => {
    console.log(`查询回访 ${JSON.stringify(ctx.query)}`)
    var results = await Review.find({vehicleId:ctx.query.id})
    ctx.status = 200
    ctx.body = {
        code:0,
        results,
        status:1
    }
})

router.post('/add', async (ctx, next) => {

    const review = new Review({
        create_date:ctx.request.body.create_date,
        content:ctx.request.body.content,
        vehicleId:ctx.request.body.vehicleId
    })

    let code = 0

    try {
        await review.save()
        ctx.body = {
            code:0
        }
    } catch (error) {
        ctx.body = {
            code:-1
        }
    }
})

module.exports = router