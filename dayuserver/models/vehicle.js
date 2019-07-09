const mongoose = require('mongoose')

let vehicleSchema = new mongoose.Schema({
    plate_num:String,
    insurant:String,
    vechicle_type:String,
    regist_date:Date,
    busi_depart:String,
    vin_no:String,
    engine_sn:String,
    insured_is:String,
    cli_expire_date:Date,
    gap_expire_date:Date,
    gap_content:String,
    checkcar_date:Date,
    customer_tel:String,
    report_tel:String,
    lastyear_info:String
},{
    _id:true
})
module.exports = mongoose.model('Vehicle',vehicleSchema)