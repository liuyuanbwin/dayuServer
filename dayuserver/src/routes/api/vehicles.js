const router = require('koa-router')()
const Vehicle = require('../../models/vehicle')
const proving = require('../../helpers/token/proving')
const path = require('path')
var fs = require('fs')
var mongoose = require('mongoose')

router.prefix('/api/vehicles')

router.get('/', async (ctx, next) => {

    let token = ctx.request.header.authorization

    if (token) {
        let res = proving(token)

        if (res) {
            console.log('判定通过')
        } else {
            console.log('判定没通过')
        }

        if (!res) {
            ctx.status = 401
            ctx.body = {
                message: 'token 不是token 无效'
            }
            return
        }

        if (res && res.exp <= new Date() / 1000) {

            ctx.status = 401
            ctx.body = {
                messag: 'token 过期 无效'
            }

        } else {
            console.log(`车牌号--. ${JSON.stringify(ctx.request.query.plate_num)}`)

            var keyword = ctx.request.query.plate_num
            var result = {}

            if (keyword) {

                //模糊查找
                var _filter = {
                    plate_num: {
                        $regex: keyword
                    }
                }
                // {
                //     $or: [{
                //         plate_num: {
                //             $regex: keyword
                //         }
                //     }, {}]
                // }

                result = await Vehicle.find(_filter)

            } else {
                result = await Vehicle.find({})
            }

            ctx.status = 200
            ctx.body = {
                code: 0,
                result,
                status: 1
            }
        }
    } else {
        ctx.status = 401
        ctx.body = {
            messag: 'token 没有 无效'
        }
    }
})
router.post('/getVehicles', async (ctx, next) => {

    try {
        let {
            size = 15,
                page = 1,
                days = 1,
                querytype = 'all'
        } = ctx.request.body

        let options = {
            skip: Number((page - 1) * size),
            limit: Number(size)
        }

        //let querytype = ctx.request.body.querytype

        var conditions = {}

        //取到当前的时间
        var dateNow = new Date()

        var startDate = new Date()
        startDate.setTime(dateNow.getTime() - 1000 * 60 * 60 * 24 * 30 * 1)

        var endDate = new Date()
        endDate.setTime(dateNow.getTime() + 1000 * 60 * 60 * 24 * days)

        console.log(`<<<<<<<<<>>>>>>>> body ${JSON.stringify(ctx.request.body)}`)

        var res,
            total

        if (querytype == 'all') {

            conditions = {}

        } else if (querytype == 'cli') {

            conditions = {
                "$and": [{
                    "cli_expire_date": {
                        "$gte": startDate,
                        "$lte": endDate
                    }
                }]
            }
        } else if (querytype == 'gap') {
            conditions = {
                "$and": [{
                    "gap_expire_date": {
                        "$gte": startDate,
                        "$lte": endDate
                    }
                }]
            }
        } else if (querytype == "checkcar") {
            conditions = {
                "$and": [{
                    "checkcar_date": {
                        "$gte": startDate,
                        "$lte": endDate
                    }
                }]
            }
        }

        if (ctx.request.body.identity == "manager") {

            conditions
                .$and
                .push({
                    managerid: ctx.request.body.managerid
                })
            console.log(`manager conditions ---> ${JSON.stringify(conditions)}`)
            res = await Vehicle.find(conditions, null, options).skip(size * (page - 1)).limit(size)
            total = await Vehicle.count(conditions)
            console.log(`maanger res --< ${JSON.stringify(res)}}`)

        } else {

            conditions
                .$and
                .push({
                    employeeid: ctx.request.body.employeeid
                })
            console.log(`conditions ---> ${JSON.stringify(conditions)}`)
            res = await Vehicle.find(conditions, null, options).skip(size * (page - 1)).limit(size)
            total = await Vehicle.count(conditions)
            console.log(`employeeid res --< ${JSON.stringify(res)}}`)
        }

        let data = {
            list: res,
            pagination: {
                total,
                page,
                size
            }
        }
        console.log(
            `body ${JSON.stringify(ctx.request.body)}  res ${JSON.stringify(data)}`
        )
        ctx.body = {
            code: 0,
            data
        }

    } catch (error) {
        ctx.body = {
            code: -1,
            error
        }
    }
})
router.post('/detail', async (ctx, next) => {
    console.log('detail ')
    try {
        const results = await Vehicle.findOne({
            "_id": mongoose
                .Types
                .ObjectId(ctx.request.body.id)
        })
        ctx.body = results
    } catch (error) {
        ctx.body = {
            code: -1,
            error
        }
    }
})

router.post('/update', async (ctx, next) => {

    try {

        const result = await Vehicle
            .where({
                "_id": mongoose
                    .Types
                    .ObjectId(ctx.request.body.id)
            })
            .update({
                plate_num: ctx.request.body.plate_num,
                insurant: ctx.request.body.insurant,
                vehicle_type: ctx.request.body.vehicle_type,
                regist_date: ctx.request.body.regist_date,
                busi_depart: ctx.request.body.busi_depart,
                vin_no: ctx.request.body.vin_no,
                engine_sn: ctx.request.body.engine_sn,
                insured_is: ctx.request.body.insured_is,
                cli_expire_date: ctx.request.body.cli_expire_date,
                gap_expire_date: ctx.request.body.gap_expire_date,
                gap_content: ctx.request.body.gap_content,
                checkcar_date: ctx.request.body.checkcar_date,
                customer_tel: ctx.request.body.customer_tel,
                report_tel: ctx.request.body.report_tel,
                remark: ctx.request.body.remark,
                owner: ctx.request.body.owner,
                linkman: ctx.request.body.linkman,
                linkman_tel1: ctx.request.body.linkman_tel1,
                linkman_tel2: ctx.request.body.linkman_tel2,
                busi_man: ctx.request.body.busi_man,
                busi_man_tel: ctx.request.body.busi_man_tel,
                headquarter: ctx.request.body.headquarter,
                car_model: ctx.request.body.car_model
            })

        ctx.body = {
            code: 0
        }

    } catch (err) {

        ctx.body = {
            code: -1
        }
    }

})

router.post('/add', async (ctx, next) => {

    const vehicle = new Vehicle({
        plate_num: ctx.request.body.plate_num,
        insurant: ctx.request.body.insurant,
        vehicle_type: ctx.request.body.vehicle_type,
        regist_date: ctx.request.body.regist_date,
        busi_depart: ctx.request.body.busi_depart,
        vin_no: ctx.request.body.vin_no,
        engine_sn: ctx.request.body.engine_sn,
        insured_is: ctx.request.body.insured_is,
        cli_expire_date: ctx.request.body.cli_expire_date,
        gap_expire_date: ctx.request.body.gap_expire_date,
        gap_content: ctx.request.body.gap_content,
        checkcar_date: ctx.request.body.checkcar_date,
        customer_tel: ctx.request.body.customer_tel,
        report_tel: ctx.request.body.report_tel,
        remark: ctx.request.body.remark,
        owner: ctx.request.body.owner,
        linkman: ctx.request.body.linkman,
        linkman_tel1: ctx.request.body.linkman_tel1,
        linkman_tel2: ctx.request.body.linkman_tel2,
        busi_man: ctx.request.body.busi_man,
        busi_man_tel: ctx.request.body.busi_man_tel,
        headquarter: ctx.request.body.headquarter,
        car_model: ctx.request.body.car_model,
        managerid: ctx.request.body.managerid,
        employeedi: ctx.request.body.employeeid
    })

    let code = 0

    try {
        await vehicle.save()
        ctx.body = {
            code: 0
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: -1
        }
    }

})

module.exports = router