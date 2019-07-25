const router = require('koa-router')()
const Client = require('../../models/client')
const User = require('../../models/user')
const Dayu = require('../../helpers/dayu')

router.prefix('/api/clients')

router.get('/', async (ctx, next) => {
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

module.exports = router