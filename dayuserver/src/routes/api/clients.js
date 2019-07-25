const router = require('koa-router')()
const Client = require('../../models/client')
const User = require('../../models/user')
const Dayu = require('../../helpers/dayu')

router.prefix('/api/clients')

router.get('/', async (ctx, next) => {
    let results = Client.find({})
    ctx.body = {
        code:0,
        results,
        status:1
    }
})
router.get('/reload', async (ctx, next) => {
    let result = await Dayu.getUserlist()
    // .then((res, req) => {     console.log('userlist ' + JSON.stringify(res)) })
    var openids = result.body.data.openid
    var i = 0
    openids.forEach(async element => {
        const client = new Client({openid: element})

        try {
            await client.save()
            console.log(' count ' + i)
            i++
        } catch (err) {
            console.log('err ' + err)
        }
    });
    ctx.body = JSON.stringify(result)
})

router.get('/loadbaseinfo', async (ctx, next) => {
    const result = await Client.find({})
    result.forEach(async element => {
        var baseinfo = await Dayu.getClientBaseInfo(element.openid)

        try {
            const updateresult = await Client
                .where({openid: element.openid})
                .update({
                    nickname: baseinfo.body.nickname,
                    sex: baseinfo.body.sex,
                    city: baseinfo.body.city,
                    province: baseinfo.body.province,
                    headimgurl: baseinfo.body.headimgurl,
                    subscribe_time: baseinfo.body.subscribe_time,
                    remark: baseinfo.body.remark,
                    groupid: baseinfo.body.groupid,
                    tagid_list: baseinfo.body.tagid_list,
                    subscribe_scene: baseinfo.body.subscribe_scene
                })

            console.log('更新结果 ----> ' + JSON.stringify(updateresult))
        } catch (err) {
            console.log('基本信息出错 -- < ' + err)
        }

    });
})

module.exports = router