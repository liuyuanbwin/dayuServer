const router = require('koa-router')()
const addtoken = require('../../token/addtoken')
const proving = require('../../token/proving')

router.prefix('/api')

const wait = ()=> {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve("99998888")
        },3000)
    })
}

router.post('/login', async ctx => {
    let user = ctx.request.body.email;
    let pass = ctx.request.body.password;
    console.log('login <<<>>>' + JSON.stringify(ctx.request.body))
    result = await wait(ctx)
    let tk = addtoken({user, pass})
    ctx.status = 200
    ctx.body = {
        tk,
        user:user,
        code:1,
        status:200
    }
})

module.exports = router