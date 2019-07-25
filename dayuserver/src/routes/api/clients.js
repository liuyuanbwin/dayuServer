const router = require('koa-router')()
const Client = require('../../models/client')
const User = require('../../models/user')
const Dayu = require('../../helpers/dayu')

router.prefix('/api/clients')

router.get('/reload', async (ctx, next) => {
    let result = await Dayu.getUserlist()
                // .then((res, req) => {
                //     console.log('userlist ' + JSON.stringify(res))
                // })
    var openids = result.body.data.openid 
    var i = 0
    openids.forEach(async element => {
        const client = new Client({
            openid:element
        })

        try {
            await client.save()
            console.log(' count ' + i)
            i ++ 
        } catch (err) {
            console.log('err ' + err )
        }
    });
    ctx.body = JSON.stringify(result)
})

router.get('/loadbaseinfo', async (ctx, next) => {
    const result = await Client.find({})
    result.forEach(async element => {
        var baseinfo = await Dayu.getClientBaseInfo(element.openid)

        console.log('baseinfo ---> ' + JSON.stringify(baseinfo))
    });
})


module.exports = router