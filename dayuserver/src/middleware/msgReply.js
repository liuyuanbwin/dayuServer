module.exports = () => {
    return async (ctx, next) => {
        console.log('====================================');
        console.log(ctx.req.body);
        console.log('====================================');
        ctx.body = ctx.req.body

        var xml = ctx.req.body.xml
        var msgType = xml.MsgType[0]
        var content = xml.Content[0]
        var toUserName = xml.ToUserName[0]
        var toFromName = xml.FromUserName[0]
        const createTime = Date.parse(new Date())

        ctx.body = `<xml>
        <ToUserName><![CDATA[${toFromName}]]></ToUserName>
        <FromUserName><![CDATA[${toUserName}]]></FromUserName>
        <CreateTime>${createTime}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[欢迎关注陈小皮公众号，下面请开始你的表演！]]></Content>
        </xml>`;


       // await next()
    }
}