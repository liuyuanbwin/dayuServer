const mongoose = require('mongoose')

let keywordSchema = new mongoose.Schema({
    keyword:String,
    reply:String
},{
    _id:true
})

module.exports = mongoose.model('KeywordReply', keywordSchema)