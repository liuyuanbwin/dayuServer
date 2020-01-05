const mongoose = require('mongoose')
let insuranceBillSchema = new mongoose.Schema({
  create_date: Date,
  bill_type: Number,
  expire_date: Date,
  content: String,
  vehicleId: String
}, {
  _id,
  true
})
module.exports = mongoose.model('InsurancdBill', insuranceBillSchema)