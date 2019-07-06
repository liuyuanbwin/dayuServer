const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name:String,
    sex:String,
    tel:String,
    address:String,
    role:Number
},{
    _id:true
})

module.exports = mongoose.model('User', userSchema)