const router = require('koa-router')()
const addtoken = require('../../helpers/token/addtoken')
const proving = require('../../helpers/token/proving')
const User = require('../../models/user')
const md5 = require('../../models/tools')

router.prefix('/api')

const wait = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("99998888")
        }, 3000)
    })
}

router.post('/login', async ctx => {
    let user = ctx.request.body.email;
    let pass = ctx.request.body.password;

    await User.find({
        email: ctx.request.body.email
    }).then(function (result) {
        if (result[0].password == md5.MD5(ctx.request.body.password)) {
            let tk = addtoken({
                user,
                pass
            })
            ctx.status = 200
            ctx.body = {
                id:result[0]._id,
                tk,
                user: user,
                identity: result[0].identity,
                code: 1,
                status: 200
            }
        } else {

            ctx.status = 200
            ctx.body = {
                message: '用户名或密码错误',
                code: 40001
            }
        }

    })
})

module.exports = router