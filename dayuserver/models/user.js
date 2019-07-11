const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    identity:String
},{
    _id:true
})

module.exports = mongoose.model('User', userSchema)