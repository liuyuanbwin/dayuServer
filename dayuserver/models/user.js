const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name:String,
    sex:String,
    state:String,
    hobby:String,
    marriage:String,
    birthday:Date,
    address:String,
    role:Number
},{
    _id:true
})

module.exports = mongoose.model('User', userSchema)