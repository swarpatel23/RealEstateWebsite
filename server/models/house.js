const mongoose = require('mongoose')

const Schema = mongoose.Schema

const houseSchema = new Schema({
    user_id: { type: 'ObjectId', ref: 'users' },
    saleprice:'Number',
    views: 'Number',
    yearbuilt: 'Number',
    postingdate: { type: Date },
    type: String,
    rentprice: 'Number',
    securitydeposite: 'Number',
    leaseduration: String,
    beds: 'Number',
    baths: 'Number',
    forrentby: String,
    squarefeet: String,
    storeys: 'Number',
    address: String,
    latitude: String,
    longitude: String,
    description: String,
    contactperson: String,
    pets:Boolean,
    contactemail: String,
    contactphone: String,
     amenities: {
        ac: Boolean, balcony_or_deck: Boolean, furnished: Boolean, hardwood_floor: Boolean,
        garage_parking: Boolean, off_street_parking: Boolean, indoorgames: Boolean, swimmingpool: Boolean, elevator: Boolean
    }, houseimg: [String]

})

module.exports = mongoose.model('house', houseSchema, 'housedetails')

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