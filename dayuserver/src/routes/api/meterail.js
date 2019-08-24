const router = require('koa-router')()
const Token = require('../../helpers/WXTokenHelper')

router.prefix('/api/meterail')

function addMaterail(accessToken, type, ctx) {
    var url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=${type}`
    var opts = {
        url: url,
        method: "post"
    }
    return new Promise(function(resolve, reject) {
        //使用ctx.req管道将ctx.req流导入到request 请求中
        ctx.req.pipe(request(opts, function(error, response, body) {
            if(error) {
                return reject(error);
            }
            resolve(body)
        }))
    })
}
router.post('/add',async (ctx, next) => {
    var token = await Token.getToken('token')
    var meterailRes = await addMaterail(token.token, "image", ctx)
    ctx.body = meterailRes
})

module.exports = router