const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    contactnumber: String,
    address: String
})

module.exports = mongoose.model('user',userSchema,'users')