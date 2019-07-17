const xml = require('../helpers/xml')
const Vehicle = require('../models/vehicle')
module.exports = () => {
    return async (ctx, next) => {

        var msg = ctx.req.body.xml
        var msgType = msg.MsgType[0]
        var content = msg.Content[0]
        var toUserName = msg.ToUserName[0]
        var toFromName = msg.FromUserName[0]
        const createTime = Date.parse(new Date())

        
       
        const result = await Vehicle.findOne({
            plate_num:{$regex:content}
        })


        ctx.body = xml.jsonToXml({
            xml: {
                ToUserName: toFromName,
                FromUserName: toUserName,
                CreateTime: Date.now(),
                MsgType: msgType,
                Content: result + "skfjahksjfh "
            }
        })

       // await next()
    }
}