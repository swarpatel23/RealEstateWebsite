const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    user_id: { type: 'ObjectId', ref: 'users' },
    house_id:{ type: 'ObjectId', ref:'houses'},
    
    date1: { type: Date },
    date2: { type: Date },
    userpreferedprice:Number,
    description:String,  
    status:Boolean

})

module.exports = mongoose.model('appointment', appointmentSchema, 'appointments')

// housedetail = {
//     user_id: "", saleprice: "", views: 0, yearbuilt: "", postingdate: "",
//     type: "", rentprice: "", securitydeposite: "", leaseduration: "", beds: "",
//     baths: "", forrentby: "",
//     squarefeet: "", storeys: "", address: "", latitude: "", longitude: "", description: "",
//     contactperson: "",
//     pets: false,
//     contactemail: "", contactphone: "", amenities: {
//         ac: false, balcony_or_deck: false, furnished: false, hardwood_floor: false,
//         garage_parking: false, off_street_parking: false, indoorgames: false, swimmingpool: false, elevator: false
//     }, houseimg: []
// }