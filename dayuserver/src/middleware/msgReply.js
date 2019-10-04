const xml = require('../helpers/xml')
const Vehicle = require('../models/vehicle')
const Keyword = require('../models/keywordReply')
const Dayu = require('../helpers/dayu')
const moment = require('moment')
const Token = require('../helpers/WXTokenHelper')

exports.xmlReply = async (ctx, next) => {
    var msg = ctx.req.body.xml
    var msgType = msg.MsgType[0]
    if (msgType == 'text') {
        var content = msg.Content[0]
        var toUserName = msg.ToUserName[0]
        var toFromName = msg.FromUserName[0]
        const createTime = Date.parse(new Date())
        const result = await Vehicle.findOne({
            plate_num: {
                $regex: content
            }
        })

        console.log(`查询车辆结果 ${JSON.stringify(result)}`)

        if (JSON.stringify(result) == 'null') {

            const keywordReply = await Keyword.findOne({
                keyword: {
                    $regex: content
                }
            })

            var noresult = "未能识别您的信息,请确确认后重新查询.发送车牌号码查询车辆投保信息,字母为大写,发送保险公司名称,查询客服电话."

            if (JSON.stringify(keywordReply) != 'null') {
                console.log('reply ' + JSON.stringify(keywordReply))
                noresult = keywordReply.reply
            }

            ctx.body = xml.jsonToXml({
                xml: {
                    ToUserName: toFromName,
                    FromUserName: toUserName,
                    CreateTime: Date.now(),
                    MsgType: msgType,
                    Content: noresult
                }
            })

        } else {
            let token = await Token.getToken('token')

            var cliExpireDate,gapExpireDate
            if (moment(result.cli_expire_date).format('YYYY-MM-DD') == '1970-01-01' || moment(result.cli_expire_date).format('YYYY-MM-DD') == 'Invalid date') {
                cliExpireDate = "无"
            }else{
                cliExpireDate = moment(result.cli_expire_date).format('YYYY-MM-DD')
            }

            if (moment(result.gap_expire_date).format('YYYY-MM-DD') == '1970-01-01' || moment(result.gap_expire_date).format('YYYY-MM-DD') == 'Invalid date') {
                gapExpireDate = '无'
            }else{
                gapExpireDate = moment(result.gap_expire_date).format('YYYY-MM-DD')
            }

            await Dayu
                .postModelMsg(token.token, {
                    touser: toFromName,
                    template_id: 'WJfbmu_n3L_YLrO_ATG5fuOdrQ1nXcj2i53XlUFd6DM',
                    topcolor: "#FF0000",

                    

                    data: {
                        first: {
                            value: '尊敬的' + result.plate_num + '车主,您的车险信息如下',
                            color: "#778899"
                        },
                        keyword1: {
                            value: moment(result.cli_expire_date).format('YYYY-MM-DD'),
                            color: '#005500'
                        },
                        keyword2: {
                            value: moment(result.gap_expire_date).format('YYYY-MM-DD'),
                            color: '#000077'
                        },
                        keyword3: {
                            value: result.gap_content,
                            color: '#000077'
                        },
                        keyword4:{
                            value: result.insured_is,
                            color: '#000077'
                        },
                        keyword5:{
                            value: result.report_tel,
                            color: '#000077'
                        },
                        remark: {
                            value: result.remark,
                            color: '#777700'
                        }
                    }
                })
                .then((res, err) => {
                    console.log(`发送模板消息结果 --> ${JSON.stringify(res)}`)
                    if (err) {
                        console.log('error ' + err + JSON.stringify(res));

                    }
                })

            ctx.body = 'success'

        }
    } else {

        ctx.body = 'success'
    }
}
