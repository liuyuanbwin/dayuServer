const mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
    openid:String,
    nickname:String,
    sex:Number,
    city:String,
    province:String,
    headimgurl:String,
    subscribe_time:Date,
    remark:String,
    groupid:Number,
    tagid_list:[Number],
    subscribe_scene:String,
    tel:String
},{
    _id:true
})

module.exports = mongoose.model('Client',clientSchema)