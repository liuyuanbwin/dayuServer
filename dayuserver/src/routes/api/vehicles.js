const router = require('koa-router')()
const Vehicle = require('../../models/vehicle')
const proving = require('../../helpers/token/proving')
const path = require('path')
var fs = require('fs')
var mongoose = require('mongoose')

router.prefix('/api/vehicles')

router.get('/', async(ctx,next) => {

    let token = ctx.request.header.authorization 

    if(token){
        let res = proving(token)

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

router.post('/update', async(ctx,next) => {

    try {

        const result = await Vehicle.where({
            "_id": mongoose.Types.ObjectId(ctx.request.body.id)
        }).update({
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
                remark:ctx.request.body.remark,
                owner:ctx.request.body.owner,
                linkman:ctx.request.body.linkman,
                linkman_tel1:ctx.request.body.linkman_tel1,
                linkman_tel2:ctx.request.body.linkman_tel2,
                busi_man:ctx.request.body.busi_man,
                busi_man_tel:ctx.request.body.busi_man_tel,
                headquarter:ctx.request.body.headquarter,
                car_model:ctx.request.body.car_model
            })
        
        ctx.body = {
            code:0
        }

    } catch (err) {
        
        ctx.body = {
            code:-1
        }
    }
    
})

router.post('/add', async(ctx,next) => {
    console.log(ctx.request.body)

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
        remark:ctx.request.remark,
        owner:ctx.request.body.owner,
        linkman:ctx.request.linkman,
        linkman_tel1:ctx.request.linkman_tel1,
        linkman_tel2:ctx.request.linkman_tel2,
        busi_man:ctx.request.busi_man,
        busi_man_tel:ctx.request.busi_man_tel,
        headquarter:ctx.request.headquarter,
        car_model:ctx.request.car_model
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