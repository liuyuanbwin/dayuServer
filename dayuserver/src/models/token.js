const mongoose = require('mongoose')

let tokenSchema = new mongoose.Schema({
    type:String,
    token:String,
    expires:Number
},{
    _id:true
})

module.exports = mongoose.model('Token',tokenSchema)