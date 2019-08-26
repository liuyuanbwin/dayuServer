const mongoose = require('mongoose')

let reviewSchema  = new mongoose.Schema({
    create_date:Date,
    content:String,
    create_man:String,
    remark:String
},{
    _id:true
})

module.exports = mongoose.model('Review',reviewSchema,'review')