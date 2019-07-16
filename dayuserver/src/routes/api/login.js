const router = require('koa-router')()
const addtoken = require('../../helpers/token/addtoken')
const proving = require('../../helpers/token/proving')
const User = require('../../models/user')
const md5 = require('../../models/tools')

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

    await User.find({
        email:ctx.request.body.email
    }).then(function(result){
        console.log(result[0].password + ' ==== '+ md5.MD5(ctx.request.body.password)+ ' ==== '+ md5.MD5(ctx.request.body.password))
        if(result[0].password == md5.MD5(ctx.request.body.password)){
            let tk = addtoken({user, pass})
    ctx.status = 200
    ctx.body = {
        tk,
        user:user,
        code:1,
        status:200
    }
        }else{
           
    ctx.status = 401
    ctx.body = {
        message: '密码错误'
    }
        }
        
    })

    
    
    
})

module.exports = router