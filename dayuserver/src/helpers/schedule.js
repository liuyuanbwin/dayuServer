var schedule = require('node-schedule')
var Dayu = require('../helpers/dayu')
const moment = require('moment')
const Token = require('../helpers/WXTokenHelper')
const Client = require('../models/client')
var fs = require('fs')

exports.schedule = () => {
    var forbiddenNums = [
        '今日不限行',
        '4 和 9',
        '5 和 0',
        '1 和 6',
        '2 和 7',
        '3 和 8',
        '今日不限行'
    ]

    var currentdate = new Date()
    var week = currentdate.getDay()
    var forbiddenStr = forbiddenNums[week]

    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [
        0,
        new schedule.Range(1, 6)
    ];

    rule.hour =12;

    rule.minute =10;
    var j = schedule.scheduleJob(rule, async function () {

        console.log('schedule sssss')
        let token = await Token.getToken('token')
        console.log(' 使用的token ' + JSON.stringify(token))
        let clients = await Dayu.getUserlist(token.token)

        console.log('clenit ' + JSON.stringify(clients))

        //clients.body.data.openid =  ["omkUruH6_g0dovrbmjMM5VdtHAe4","omkUruLvdfDSS51akLyGDs9CV2CA", "omkUruLhonCbGOw9ywJWzZ3vJUg0"]
        console.log('dirname ' + __dirname)
        var myDate = new Date();
        var mytime = myDate.toLocaleTimeString();

        fs.appendFile(
            __dirname + '/log.txt',
            mytime + `用来请求的token是 ${JSON.stringify(token)} `+JSON.stringify(clients) + '\n',
            function (err) {
                console.log('log 写入出错' + err)
            }
        )

        clients
            .body
            .data
            .openid
            .forEach(async element => {
                console.log('openid ' + element)
                // try {
                //     await Dayu.postModelMsg(token.token, {
                //         touser: element,
                //         template_id: 'ef-7cKV2Asjckz-WyvNTAn0a5CE0zMKiTVYk__OGUiE',
                //         topcolor: "#FF0000",
                //         url: "http://www.bl1000.cn/wx/weather",
                //         data: {
                //             first: {
                //                 value: '本轮涿州限行如下',
                //                 color: "#778899"
                //             },
                //             keyword1: {
                //                 value: moment(new Date()).format('YYYY-MM-DD'),
                //                 color: '#005500'
                //             },
                //             keyword2: {
                //                 value: '涿州市二环路内（含二环路)',
                //                 color: '#005500'
                //             },
                //             keyword3: {
                //                 value: forbiddenStr,
                //                 color: '#FF0000'
                //             },
                //             keyword4: {
                //                 value: '07:00-19:00',
                //                 color: '#005500'
                //             },
                //             remark: {
                //                 value: '限行详情及近期天气请点击\"详情\"',
                //                 color: '#778899'
                //             }
                //         }
                //     });
                // } catch (err) {
                //     console.log('error ' + err);

                // }

            })
    })
}