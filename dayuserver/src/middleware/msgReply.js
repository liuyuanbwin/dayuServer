const xml = require('../helpers/xml')
const Vehicle = require('../models/vehicle')
const Dayu = require('../helpers/dayu')
const moment = require('moment')
module.exports = () => {
    return async (ctx, next) => {

        var msg = ctx.req.body.xml
        var msgType = msg.MsgType[0]


        if(msgType == 'text'){
            var content = msg.Content[0]
            var toUserName = msg.ToUserName[0]
            var toFromName = msg.FromUserName[0]
            const createTime = Date.parse(new Date())
    
            const result = await Vehicle.findOne({
                plate_num:{$regex:content}
            })

            console.log('查询结果 -- >' + JSON.stringify(result)) 


            if(result == null){
                ctx.body ="未查询到您的车辆信息,请确确认后重新查询.发送车牌号码查询车辆投保信息,字母为大写"
            }else{
                await Dayu.postModelMsg({
                    touser:toFromName,
                    template_id:'IIFWNAzKrk_ZXpR92NA3D-VQoBDGVIsyDAQRKpCjVJc',
                    topcolor:"#FF0000",
                    data:{
                        first:{
                            value:'尊敬的' + result.plate_num +'车主您的交强险信息如下',
                            color:"#778899"
                        },
                        keynote1:{
                            value:moment(result.cli_expire_date).format('YYYY-MM-DD'),
                            color:'#005500'
                        },
                        keynote2:{
                            value:moment(result.cli_expire_date).format('YYYY-MM-DD'),
                            color:'#000077'
                        },
                        remark:{
                            value:'大宇车友竭诚为您服务,详情联系石微微',
                            color:'#777700'
                        }
                    }
                }).then(res => {
                    
                })

                ctx.body = 'success' 
            }
    
            
        }
       

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