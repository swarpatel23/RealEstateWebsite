const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')
const PORT = 8000
const app = express()
app.use(express.static('uploads'));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({   
    extended: true
}));
//app.use('/uploads', express.static(__dirname + '/uploads/userphotos'));
app.use('/api',api)
app.get('/',function(req,res){
    res.end("hello from server")
})


app.listen(PORT,function(){
    console.log("hello console")
})