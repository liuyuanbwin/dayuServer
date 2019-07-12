const router = require('koa-router')()
const Vehicle = require('../../models/vehicle')
const proving = require('../../token/proving')
const path = require('path')
var fs = require('fs')

router.prefix('/api/vehicles')

router.get('/', async(ctx,next) => {

    let token = ctx.request.header.authorization 
    console.log('>>>>>>' + token)
    if(token){
        let res = proving(token)
        console.log(res + ' token 类型 ==>' + typeof(res))

        if(res){
            console.log('判定通过')
        }else{
            console.log('判定没通过')
        }

        if(!res){
            ctx.status = 401
            ctx.body = {
                message:'token 不是token 无效'
            }
            return
        }

        if(res && res.exp <= new Date()/1000){

            ctx.status = 401
            ctx.body = {
                messag:'token 过期 无效'
            }
            
           
        }else{
            const result = await Vehicle.findOne({
                plate_num:ctx.params.plate_num
            })
        
            const results = await Vehicle.find({})
            ctx.status = 200
            ctx.body = {
                code:0,
                result,
                results,
                status:1
            }
        }
    }else{
        ctx.status = 401
            ctx.body = {
                messag:'token 没有 无效'
            }
    }
})

router.post('/add', async(ctx,next) => {
    console.log(ctx.request.body)

    /*
    var file = path.join(__dirname,'/dayudata_final.json')

    var data = fs.readFileSync(file,'utf-8')

    var vvs = JSON.parse(data)

    let errorCount = 0
    for(i = 0; i < vvs.length;i++){
        let v = vvs[i]
    const vehicle = new Vehicle({
        plate_num:v.plate_num,
        insurant:v.insurant,
        vehicle_type:v.vehicle_type,
        regist_date:v.regist_date,
        busi_depart:v.busi_depart,
        vin_no:v.vin_no,
        engine_sn:v.engine_sn,
        insured_is:v.insured_is,
        cli_expire_date:v.cli_expire_date,
        gap_expire_date:v.gap_expire_date,
        gap_content:v.gap_content,
        checkcar_date:v.checkcar_date,
        customer_tel:v.customer_tel,
        report_tel:v.report_tel,
        lastyear_info:v.lastyear_info
    })
    

    let code = 0

    try {
        await vehicle.save()
        console.log(i)
        ctx.body = {
            code:0
        }  
    } catch (err) {
        errorCount += 1
        console.log(err)
        console.log('error >>>>> ' + errorCount)
        ctx.body = {
            code:-1
        }
    }
    }
    */
    
    const vehicle = new Vehicle({
        plate_num:ctx.request.body.plate_num,
        insurant:ctx.request.body.insurant,
        vehicle_type:ctx.request.body.vehicle_type,
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