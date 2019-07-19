const xml = require('../helpers/xml')

module.exports = () => {
    return async (ctx, next) => {

        console.log('   -----   xmlParse ----------')
        
        if (ctx.method == 'POST' && ctx.is('text/xml')) {


            let promise = new Promise(function (resolve, reject) {
                let buf = ''
                ctx.req.setEncoding('utf8')
                ctx.req.on('data', (chunk) => {
                    buf += chunk
                })

                ctx.req.on('end', () => {
                    xml.xmlToJson(buf)
                        .then(resolve)
                        .catch(reject)
                })
            })

            await promise.then((result) => {
                console.log(' 互动消息  ---> ' + result)
                    ctx.req.body = result
                })
                .catch((e) => {
                    e.status = 400
                })

            await next()
        } else {
            await next()
        }
    }
}
