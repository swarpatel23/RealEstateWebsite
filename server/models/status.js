const mongoose = require('mongoose')

const Schema = mongoose.Schema

const statusSchema = new Schema({
    appointment_id: { type: 'ObjectId', ref: 'appointments' },        
    date:Number,
    status:Boolean
})

module.exports = mongoose.model('status', statusSchema, 'status')
