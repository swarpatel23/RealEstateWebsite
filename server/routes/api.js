const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const db = 'mongodb+srv://pc:pc810@realestateps-9mo4b.mongodb.net/RealEststePS?retryWrites=true&w=majority'
const router = express.Router()

mongoose.connect(db,function(err){
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("Connected to MongoDB")
    }
})
//use this as middleware for request which needed login required(testing remaining)
function verifyToken(req,res,next)
{
    if(!req.headers.authorization)
    {
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==null)
    {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = just.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized Request')
    }

    req.userId = payload.subject
    next()
}
router.get('/',function(req,res){
    res.end("jsadkfjaksd")
})



router.post('/register',function(req,res)
{
    let userData = req.body
    let user = new User(userData)
    user.save(function(err,registeredUser)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login',function(req,res)
{
    let userData = req.body;

    User.findOne({email: userData.email},function(err,user)
    {
        if(err)
        {
            console.log(err)
        }
        else{
            if(!user)
            {
                res.status(401).send('Invalid email')
            }
            else
            {
                if(user.password != userData.password)
                {
                    res.status(401).send('Invalid Password')
                }
                else
                {   
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

module.exports = router;