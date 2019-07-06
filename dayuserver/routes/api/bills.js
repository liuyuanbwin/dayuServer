const router = require('koa-router')()
const Bill = require('../../models/bill')

router.prefix('/api/bills')

router.get('/', async(ctx, next) => {
    const result = await Bill.findOne({
        plate:ctx.params.plate
    })

    const results = await Bill.find({})

    console.log(result)

    ctx.body = {
        code:0,
        result,
        results,
        status:1
    }
})

router.post('/add', async(ctx, next) => {
    console.log(ctx.request.body)
    const bill = new Bill({
        plate:ctx.request.body.plate,
        brand:ctx.request.body.brand,
        model:ctx.request.body.model,
        owners:ctx.request.body.owners,
        insurant:ctx.request.body.insurant,
        linkman:ctx.request.body.linkman,
        linkmanTel:ctx.request.body.linkmanTel,
        registDate:ctx.request.body.registDate,
        vehicleType:ctx.request.body.vehicleType,
        agentUnit:ctx.request.body.agentUnit,
        agent:ctx.request.body.agent,
        latestUnit:ctx.request.body.latestUnit,
        latestUnitTel:ctx.request.body.latestUnitTel,
        toyearUnit:ctx.request.body.toyearUnit,
        toyearUnitTel:ctx.request.body.toyearUnitTel,
        CLIExpireDate:ctx.request.body.CLIExpireDate,
        GAPExpireDate:ctx.request.body.GAPExpireDate,
        GAPContent:ctx.request.body.GAPContent,
        hotline:ctx.request.body.hotline
    })

    let code = 0

    try {
        await bill.save()
        code = 0
    } catch (error) {
        code = -1
    }

    ctx.body = {
        code:0
    }
})

router.delete('/delete/:id', async (ctx, next) => {
    console.log('要删除的是 ' + ctx.params.id)
    let code = 0
    try {
        await Bill.deleteOne({_id:ctx.params.id}, function(err, doc){

        })
        code = 0
    } catch (err) {
        code = -1
    }
    ctx.body = {
        code
    }
})

module.exports = router