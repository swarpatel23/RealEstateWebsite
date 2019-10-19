const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const House = require('../models/house')
const jwt = require('jsonwebtoken')
//const db = 'mongodb+srv://pc:pc810@realestateps-9mo4b.mongodb.net/RealEststePS?retryWrites=true&w=majority'
const router = express.Router()
const db = 'mongodb://localhost:27017/RealEstatePs'

const multipart = require('connect-multiparty');
const usermultipartMiddleware = multipart({ uploadDir: './uploads/userphotos/' });
const housemultipartMiddleware = multipart({ uploadDir: './uploads/housephotos/' });

const IncomingForm = require('formidable').IncomingForm
var ObjectId = require('mongodb').ObjectId;

mongoose.connect(db, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Connected to MongoDB")
    }
})
//use this as middleware for request which needed login required(testing remaining)
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token == null) {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = just.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }

    req.userId = payload.subject
    next()
}

router.get('/', function (req, res) {
    res.end("jsadkfjaksd")
})



router.post('/register', function (req, res) {
    let userData = req.body
    let user = new User(userData)
    user.save(function (err, registeredUser) {
        if (err) {
            console.log(err)
        }
        else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token, registeredUser })
        }
    })
})

router.post('/login', function (req, res) {
    let userData = req.body;

    User.findOne({ email: userData.email }, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            if (!user) {
                res.status(401).send('Invalid email')
            }
            else {
                if (user.password != userData.password) {
                    res.status(401).send('Invalid Password')
                }
                else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token, user })
                }
            }
        }
    })
})

router.post('/updateuser', function (req, res) {
    let userData = req.body
    User.findOne({ email: userData.email }, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            if (!user) {
                res.status(401).send('Invalid user')
            }
            else {
                if (userData.password != "" && user.password != userData.password) {
                    res.status(401).send('Invalid Password')
                }
                else {
                    user.firstname = userData.firstname
                    user.lastname = userData.lastname
                    user.recoveryemail = userData.recoveryemail
                    if (userData.newpassword != "") {
                        user.password = userData.newpassword
                    }
                    user.contactnumber = userData.contactnumber
                    user.address = userData.address
                    user.userphoto = userData.userphoto
                    user.save()

                    res.status(200).send({ user })

                }
            }
        }
    })

})

router.post('/uploadhousedetails', function (req, res) {
    let housedata = req.body
    
    //console.log(req.body)
    if (req.body.house_id!="") {
        var hidobject = new ObjectId(req.body.house_id)
        House.findOne({ _id: hidobject }, function (err, fhouse) {
            if (err) {
                console.log(err);
            }
            else {
                
                fhouse.saleprice = housedata.saleprice;
                fhouse.yearbuilt = housedata.yearbuilt;
                fhouse.postingdate = housedata.postingdate;
                fhouse.rentprice = housedata.rentprice;
                fhouse.views = housedata.views;
                fhouse.type = housedata.type;
                fhouse.securitydeposite = housedata.securitydeposite;
                fhouse.leaseduration = housedata.leaseduration;
                fhouse.beds = housedata.beds;
                fhouse.baths = housedata.baths;
                fhouse.forrentby = housedata.forrentby;
                fhouse.address = housedata.address;
                fhouse.latitude = housedata.latitude;
                fhouse.longitude = housedata.longitude;
                fhouse.description = housedata.description;
                fhouse.contactperson = housedata.contactperson;
                fhouse.contactemail = housedata.contactemail;
                fhouse.contactphone = housedata.contactphone;
                fhouse.amenities = housedata.amenities;
                fhouse.houseimg=housedata.houseimg;


                fhouse.save();

                res.status(200).send({ fhouse })
            }
        }
        )
    }
    else {
        let house = new House(housedata)
        house.save(function (err, houseinfo) {
            if (err) {
                console.log(err)
            }
            else {

                res.status(200).send({ houseinfo })
            }
        })
    }
})


router.post('/uploaduserphoto', usermultipartMiddleware, function (req, res) {
    //console.log(req.files.uploads[0].path);
    //console.log(req.files);


    var ret = req.files.uploads[0].path.replace('uploads/userphotos/', '');
    res.json({
        'message': ret
    });
})

router.post('/uploadhousephoto', housemultipartMiddleware, function (req, res) {
    var ret = [];
    for (i = 0; i < req.files.uploads.length; i++) {
        ret.push(req.files.uploads[i].path.replace('uploads/housephotos/', ''));
    }
    res.json({
        'message': ret
    });
})
router.post('/getuser', function (req, res) {
    let reqbody = req.body

    User.findOne({ email: reqbody.useremail }, function (err, userinfo) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send({ userinfo })
        }
    })
})
router.post('/finduserhouse', function (req, res) {
    let user = req.body
    //console.log("reqjaskdfj:: "+user.useri)
    //console.log("mesage::"+user)
    var uidobject = new ObjectId(user.useri)
    House.find({ user_id: uidobject }, function (err, houses) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send({ houses })
        }
    })
})

router.get('/gethouses', function (req, res) {
    House.find({}, function (err, houses) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send({ houses })
        }
    })

})



module.exports = router;