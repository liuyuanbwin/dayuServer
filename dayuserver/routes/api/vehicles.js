const router = require('koa-router')()
const Vehicle = require('../../models/vehicle')

router.prefix('/api/vehicles')

router.get('/', async(ctx,next) => {
    const result = await Vehicle.findOne({
        plate_num:ctx.params.plate_num
    })

    const results = await Vehicle.find({})

    ctx.body = {
        code:0,
        result,
        results,
        status:1
    }
})

router.post('/add', async(ctx,next) => {
    console.log(ctx.request.body)
    const vehicle = new Vehicle({
        plate_num:ctx.request.body.plate_num,
        insurant:ctx.request.body.insurant,
        vechicle_type:ctx.request.body.vechicle_type,
        regist_date:ctx.request.body.regist_date,
        busi_depart:ctx.request.body.busi_depart,
        vin_no:ctx.request.body.vin_no,
        engine_sn:ctx.request.body.engine_sn,
        insured_is:ctx.request.body.insured_is,
        cli_expire_date:ctx.request.body.cli_expire_date,
        gap_expire_date:ctx.request.body.gap_expire_date,
        gap_content:ctx.request.body.gap_content,
        checkcar_date:ctx.request.body.checkcar_date,
        customer_tel:ctx.request.body.customer_tel,
        report_tel:ctx.request.body.report_tel,
        lastyear_info:ctx.request.body.lastyear_info
    })

    let code = 0

    try {
        await vehicle.save()
        ctx.body = {
            code:0
        }  
    } catch (err) {
        console.log(err)
        ctx.body = {
            code:-1
        }
    }

})

module.exports = router