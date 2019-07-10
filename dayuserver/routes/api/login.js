const router = require('koa-router')()

router.prefix('/api')

const wait = ()=> {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve("99998888")
        },3000)
    })
}

router.post('/login', async ctx => {
    let user = ctx.request.body.eamil;
    let pass = ctx.request.body.password;
    console.log('login <<<>>>')
    result = await wait(ctx)
    console.log('>>> ' + typeof(result))
    ctx.body = result
})
module.exports = router