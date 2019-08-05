const xml = require('../helpers/xml')
const Vehicle = require('../models/vehicle')
const Keyword = require('../models/keywordReply')
const Dayu = require('../helpers/dayu')
const moment = require('moment')
const Token = require('../helpers/WXTokenHelper')

exports.xmlReply = async (ctx, next) => {

    console.log('xmlReply  +++++++++++++' + JSON.stringify(ctx.req.body))
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

        console.log('搜索了数据库 ++++++++++')

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

                    console.log('要恢复了 +++++++++')

                    ctx.body = xml.jsonToXml({
                        xml: {
                            ToUserName: toFromName,
                            FromUserName: toUserName,
                            CreateTime: Date.now(),
                            MsgType: msgType,
                            Content: noresult
                        }
                    })

                    console.log('回复晚了 +++++++++++=')

                } else {
                    let token = await Token.getToken('token')
                    console.log('token  >>>> ' + token)
                    await Dayu
                        .postModelMsg(token.token, {
                            touser: toFromName,
                            template_id: 'IIFWNAzKrk_ZXpR92NA3D-VQoBDGVIsyDAQRKpCjVJc',
                            topcolor: "#FF0000",
                            
                            data: {
                                first: {
                                    value: '尊敬的' + result.plate_num + '车主您的交强险信息如下',
                                    color: "#778899"
                                },
                                keynote1: {
                                    value: moment(result.cli_expire_date).format('YYYY-MM-DD'),
                                    color: '#005500'
                                },
                                keynote2: {
                                    value: moment(result.cli_expire_date).format('YYYY-MM-DD'),
                                    color: '#000077'
                                },
                                remark: {
                                    value: '大宇车友竭诚为您服务,详情联系石微微',
                                    color: '#777700'
                                },
                                
                            }
                        })
                        .then((res, err) => {
                            console.log('发送了模板消息 ' + JSON.stringify(res))

                            if (err) {
                                console.log('error ' + err);

                            }
                        })

                    ctx.body = 'success'

                }} else {
                console.log(' 不是  text')
                ctx.body = 'success'
            }
        }
