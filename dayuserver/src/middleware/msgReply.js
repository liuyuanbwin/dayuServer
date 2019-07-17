const xmlt = require('../helpers/xml')
module.exports = () => {
    return async (ctx, next) => {
        console.log('====================================');
        console.log(ctx.req.body);
        console.log('====================================');
        // ctx.body = {
        //     msg:"success"
        // }
        // console.log('====================================');
        var rxml = ctx.req.body.xml
        var msgType = rxml.MsgType[0]
        var content = rxml.Content[0]
        var toUserName = rxml.ToUserName[0]
        var toFromName = rxml.FromUserName[0]
        const createTime = Date.parse(new Date())

        // console.log(`<xml>
        // <ToUserName><![CDATA[${toFromName}]]></ToUserName>
        // <FromUserName><![CDATA[${toUserName}]]></FromUserName>
        // <CreateTime>${createTime}</CreateTime>
        // <MsgType><![CDATA[text]]></MsgType>
        // <Content><![CDATA[欢迎关注陈小皮公众号，下面请开始你的表演！]]></Content>
        // </xml>`)

        ctx.body = xmlt.jsonToXml({
            xml: {
                ToUserName: toFromName,
                FromUserName: toUserName,
                CreateTime: Date.now(),
                MsgType: msgType,
                Content: content + "skfjahksjfh "
            }
        })
       


       // await next()
    }
}