const xml = require('../helpers/xml')
exports.xmlToJson = async (ctx, next) => {

        console.log('   |-----   xmlParse ----------|')
        
        //if (ctx.method == 'POST' && ctx.is('text/xml')) {

            console.log(' ----- 这是  xml  -----')

            return new Promise(function (resolve, reject) {
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

            // return await promise.then((result) => {
            //     console.log(' 互动消息  ---> ' + JSON.stringify(result))
            //         ctx.req.body = result
            //     })
            //     .catch((e) => {
            //         e.status = 400
            //     })

      
       // }
    //}
}
