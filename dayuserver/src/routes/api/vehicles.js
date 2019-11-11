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
            console.log(`车牌号--. ${JSON.stringify(ctx.request.query.plate_num)}`)

            var keyword = ctx.request.query.plate_num

            if(keyword){

                 //模糊查找
            var _filter = {
                $or:[
                    {plate_num:{$regex:keyword}},
                    {}
                ]
            }

            const result = await Vehicle.find(_filter)

            }else{
                const result = await Vehicle.find({})
            }
           
            ctx.status = 200
            ctx.body = {
                code:0,
                result,
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
router.post('/getVehicles', async(ctx, next) => {
    console.log(`body ${JSON.stringify(ctx.request.body)}`)
    try{
       let { size = 10, page = 1} = ctx.request.body
       let options = {
           skip: Number((page - 1) * size),
           limit:Number(size)
       }
       if(ctx.request.body.identity == "manager"){
        let res = await Vehicle.find({managerid:ctx.request.body.managerid},null, options)
        let total = await Vehicle.countDocuments()
        
       }else{
        let res = await Vehicle.find({employeeid:ctx.request.body.employeeid},null, options)
        let total = await Vehicle.countDocuments()
       }
       console.log(`body ${JSON.stringify(ctx.request.body)}  res ${JSON.stringify(res)}`)
       let data = {
        list:res, 
        pagination:{
            total,
            page,
            size
        }
    }

    ctx.body = {
        code:0,
        data
    }
       
    }catch(error){
        ctx.body = {
            code:-1,
            error
        }
    }
})
router.post('/detail', async(ctx, next) => {
    console.log('detail ' )
    try{
        const results = await Vehicle.findOne({
            "_id": mongoose.Types.ObjectId(ctx.request.body.id)
        })
        ctx.body = results
    }catch(error){
        ctx.body = {
            code:-1,
            error
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
        remark:ctx.request.body.remark,
        owner:ctx.request.body.owner,
        linkman:ctx.request.body.linkman,
        linkman_tel1:ctx.request.body.linkman_tel1,
        linkman_tel2:ctx.request.body.linkman_tel2,
        busi_man:ctx.request.body.busi_man,
        busi_man_tel:ctx.request.body.busi_man_tel,
        headquarter:ctx.request.body.headquarter,
        car_model:ctx.request.body.car_model,
        managerid:ctx.request.body.managerid,
        employeedi:ctx.request.body.employeeid
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