const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userphoto: String,
    username: String,
    email: String,
    recoveryemail:String,
    firstname:String,
    lastname:String,
    userphoto:String,
    password: String,
    contactnumber: String,
    address: String
})

module.exports = mongoose.model('user',userSchema,'users')