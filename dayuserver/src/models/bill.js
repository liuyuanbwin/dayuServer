const mongoose = require('mongoose')

let billSchema = new mongoose.Schema({
    plate:String,
    brand:String,
    model:String,
    owners:String,
    insurant:String,
    linkman:String,
    linkmanTel:String,
    registDate:Date,
    vehicleType:String,
    agentUnit:String,
    agent:String,
    latestUnit:String,
    latestUnitTel:String,
    toyearUnit:String,
    toyearUnitTel:String,
    CLIExpireDate:Date,
    GAPExpireDate:Date,
    GAPContent:String,
    hotline:String
},{
    _id:true
})

module.exports = mongoose.model('Bill', billSchema)