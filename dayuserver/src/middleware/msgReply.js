const xml = require('../helpers/xml')
const Vehicle = require('../models/vehicle')
const Dayu = require('../helpers/dayu')
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

        Dayu.postModelMsg({
            touser:toFromName,
            template_id:'IIFWNAzKrk_ZXpR92NA3D-VQoBDGVIsyDAQRKpCjVJc',
            topcolor:"#FF0000",
            data:{
                first:{
                    value:'尊敬的' + result.plate_num +'车主您的交强险信息如下',
                    color:"#778899"
                },
                keynote1:{
                    value:result.cli_expire_date,
                    color:'#005500'
                },
                keynote2:{
                    value:result.cli_expire_date,
                    color:'#000077'
                },
                remark:{
                    value:'大宇车友竭诚为您服务,详情联系石微微',
                    color:'#777700'
                }
            }
        })

        ctx.body = 'success'

        // ctx.body = xml.jsonToXml({
        //     xml: {
        //         ToUserName: toFromName,
        //         FromUserName: toUserName,
        //         CreateTime: Date.now(),
        //         MsgType: msgType,
        //         Content: result + "skfjahksjfh "
        //     }
        // })

       // await next()
    }
}