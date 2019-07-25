const router = require('koa-router')()
const User = require('../../models/user')
const Dayu = require('../../helpers/dayu')

router.prefix('/api/clients')

router.get('/', async (ctx, next) => {
    let result = await Dayu.getUserlist()
                // .then((res, req) => {
                //     console.log('userlist ' + JSON.stringify(res))
                // })

    ctx.body = JSON.stringify(result)
})

module.exports = router