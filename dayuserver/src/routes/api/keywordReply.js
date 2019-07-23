const router = require('koa-router')()
const KeywordReply = require('../../models/keywordReply')
const proving = require('../../helpers/token/proving')

var mongoose = require('mongoose')

router.prefix('/api/keywordReply')

router.get('/', async (ctx, next) => {
    // let token = ctx.request.header.authorization

    // if(token){
    //     let res = proving(token)

    //     if(res){
    //         console.log('判定通过')
    //     }else{
    //         console.log('判定没过')
    //     }

    //     if(!res){
    //         ctx.status = 401
    //         ctx.body = {
    //             message:'token 验证无效, 请重新登录'
    //         }
    //         return
    //     }

    //     if(res && res.exp <= new Date()/1000){
    //         ctx.status = 401
    //         ctx.body = {
    //             message:'token 过期或无效,请重新登录' 
    //         }
    //     }else{
            const results = await KeywordReply.find({

            })

            ctx.body = {
                code:0,
                results,
                status:1
            }
        // }
    // }else{
    //     ctx.status = 401
    //         ctx.body = {
    //             messag:'token无效, 请重新登录'
    //         }
    // }
})

router.post('/add', async (ctx, next) => {

    console.log(' ---- **** ---- ' + JSON.stringify(ctx))
    const keywordReply = new KeywordReply({
        keyword:ctx.request.body.keyword,
        reply:ctx.request.body.reply
    })

    let code = 0

    try {
        await keywordReply.save()
        ctx.body = {
            code:0
        }
    } catch (error) {
        ctx.body = {
            code:-1
        }
    }
})

module.exports = router