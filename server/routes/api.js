const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const House = require('../models/house')
const Appointment = require('../models/appointment')
const Status = require('../models/status')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
//const db = 'mongodb+srv://pc:pc810@realestateps-9mo4b.mongodb.net/RealEststePS?retryWrites=true&w=majority'
const router = express.Router()
//const db = 'mongodb://localhost:27017/RealEstatePs'
const db = 'mongodb://database/mean-docker'
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

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ofspsv@gmail.com', pass: 'OfSpSv123'
    }
});


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


router.post('/sendmail', function (req, res) {
    //console.log(req);
    var maildata = req.body;
    var mailOptions = {
        from: "ofspsv@gmail.com",
        to: maildata.auser.email,
        subject: 'Your appointment is approved--appointment',
        text: 'be on time'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send("mail sent succesfully")
    //res.end(req)
    //'youremail@gmail.com', 'myfriend@yahoo.com', 'Sending Email using Node.js', 'It is easy to send an email!'
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
    if (req.body.house_id != "") {
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
                fhouse.houseimg = housedata.houseimg;


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
    //ret = req.files.uploads[0].path.replace('uploads\\userphotos\\', '');
    res.json({
        'message': ret
    });
})

router.post('/uploadhousephoto', housemultipartMiddleware, function (req, res) {
    var ret = [];
    for (i = 0; i < req.files.uploads.length; i++) {
        console.log(req.files.uploads[i].path);
        var x = req.files.uploads[i].path.replace("uploads/housephotos/", "");
        //x = req.files.uploads[i].path.replace("uploads\\housephotos\\", "");
        ret.push(x);
        console.log(x);
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

router.post('/getuserbyid', function (req, res) {
    let reqbody = req.body

    var uidobject = new ObjectId(reqbody.userid)
    User.findOne({ _id: uidobject }, function (err, userinfo) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send({ userinfo })
        }
    })
})
router.post('/getuserbyidforname', function (req, res) {
    let reqbody = req.body

    var uidobject = new ObjectId(reqbody.userid)
    User.findOne({ _id: uidobject }, function (err, userinfo) {
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
router.get('/getHousesWith', function (req, res) {
    console.log("in gethouses");
    console.log(req.query);
    let beds = parseInt(req.query.beds);
    let baths = parseInt(req.query.baths);
    let squarefeet = parseInt(req.query.squarefeet);
    console.log(beds, baths, squarefeet);
    House.find({ beds: { $gte: beds }, baths: { $gte: baths }, squarefeet: { $gte: squarefeet } },
        function (err, houses) {
            if (err) {

                console.log(err);
            }
            else {
                console.log('houses :', houses);
                res.status(200).send({ houses })
            }
        })
})
router.get('/inchousesview', (req, res) => {
    console.log('hid :', req.query.hid);
    // res.status(200).send( req.query.hid )
    let hid = req.query.hid;
    House.findOne({ _id: hid }, function (err, house) {
        if (err) {
            console.log('Not found', hid);
        }
        else {
            let views = house.views + 1;
            house.views = views;
            console.log('found Hid :', house);
            house.save();
            res.status(200).send({ views })
        }
    })
})
router.post('/setappointment', (req, res) => {
    let appointmentData = req.body
    let appointment = new Appointment(appointmentData);
    console.log('appointment :', appointment);
    appointment.save(function (err, res1) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send({ res1 })
        }
    })
})
router.get('/getappointment', (req, res) => {
    //console.log('user_id :', req.query.user_id);
    let user_id = req.query.user_id;
    House.find({ user_id: user_id }, function (err, houses) {
        if (err) {
            console.log(err)
        }
        else {
            let hids = [];
            let houseslist = [];
            //    console.log('houses :', houses);
            for (let index = 0; index < houses.length; index++) {
                const element = houses[index];
                hids.push(element["_id"]);
                houseslist.push({ hid: element["_id"], address: element["address"] });
            }
            //      console.log('hids :', hids);
            Appointment.find({ house_id: { $in: hids } }, (err, appointments) => {
                if (err) {
                    console.log('No appointments');
                }
                else {
                    res.status(200).send({ appointments: appointments, houses: houseslist });
                }
            });
        }
    })

})
router.get('/getprofile', (req, res) => {
    //  console.log('getprofile :', req.query.user_id);
    //res.status(200).send("hello getprofile");
    let user_id = req.query.user_id;
    User.findOne({ _id: user_id }, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            res.status(200).send({ user });
        }
    });
})


router.post('/setStatus', (req, res) => {
    let statusdata = req.body
    let status = new Status(statusdata);
    console.log('statusdata', statusdata);
    if (statusdata.status == false) {
        console.log('inside remove');
        Appointment.findOne({ _id: statusdata.appointment_id }
            , (err, ap) => {
                if (err) {
                    console.log('err :', err);
                }
                else {
                    ap.status = true;
                    ap.save();
                    status.status = false;
                    status.save((err, res1) => {
                        if (err) { console.log('err :', err); }
                        else { res.status(200).send(res1); }
                    });
                }
            })
    }
    else {
        status
            .save(
                (err, res1) => {
                    if (err)
                        console.log('err :', err);
                    else {
                        Appointment.findOne({ _id: res1.appointment_id },
                            (err, app) => {
                                if (err) {
                                    console.log('err :', err);
                                }
                                else {
                                    app.status = true;
                                    app.save();
                                    console.log('app', app);
                                }
                            })
                        res.status(200).send(res1);
                    }
                }
            )
    }
})

router.get('/checkStatus', (req, res) => {
    let user_id = req.query.user_id;
    Status.aggregate([{
        $lookup: {
            from: 'appointments',
            localField: 'appointment_id',
            foreignField: '_id',
            as: 'appointment',
        }
    }], function (err, res1) {
        if (err)
            console.log('err :', err);
        else{
           // console.log('res1 :',res1);            
            res1 = res1.filter((x) => {
                if(x.appointment.length>0)
                    return x.appointment["0"].user_id == user_id;
                else
                    return false;
                });
            res.status(200).send(res1);
        }
            
        
    })    
})

router.get('/checkMeetings',(req,res)=>{
    console.log('CHECK meertingfs' );
    let user_id = req.query.user_id;        
    House.find({user_id:user_id},(err,houses)=>
    {
        if(houses!=[])
        {
            Appointment.find({ 
                house_id : { 
                    $in : houses
                }
            },(err,apps)=>
            {
                if(apps.length<0)
                {
                    console.log('Empty apps :');
                    res.status(500).send([]);
                }
                else
                {
                    Status.find({
                        appointment_id:{
                            $in: apps
                        },
                        status:true
                    },(err,stat)=>{
                        if(err){
                            console.log('Empty Status :');
                            res.status(500).send([""]);
                        }
                        else{
                 //           res.status(200).send(stat);
                            let tempaid = [];
                            for (let index = 0; index < stat.length; index++) {
                                const element = stat[index];
                                tempaid.push(element.appointment_id);                                
                            }
                            Appointment.find(
                                {_id:{                                
                                    $in : tempaid
                                }
                            },(req,ap)=>{
                                if(err)
                                {
                                    console.log('err :', err);
                                    res.status(200).send([]);
                                }
                                else
                                {
                                    Status.aggregate([{
                                        $lookup: {
                                            from: 'appointments',
                                            localField: 'appointment_id',
                                            foreignField: '_id',
                                            as: 'appointment',
                                        }
                                    }], function (err, res1) {
                                        if (err)
                                            console.log('err :', err);
                                        else{
                                           // console.log('res1 :',res1);            
                                            res1 = res1.filter((x) => {
                                                console.log('x appoint :', x.appointment_id);
                                                for (let index = 0; index < ap.length; index++) {
                                                    const element = ap[index];
                                                    console.log('element._id:', element._id);
                                                    if(x.appointment_id.toString() == element["_id"])    
                                                    {
                                                        console.log('true ');
                                                        return true;
                                                    }
                                                } 
                                                return false;
                                                });
                                            res.status(200).send(res1);
                                        }
                                            
                                        
                                    })    
                                    //res.status(200).send(ap);
                                }
                            })
                            
                        }
                    });   
                }
            })
        }
        else{
            res.status(200).send(["in houses elese"]);
        }
    })
})
module.exports = router;