
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/PaytmUser')
const User = mongoose.model('Users', { firstName: "String", lastName: "String", password: "String" })
module.exports = User