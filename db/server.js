var express = require('express');
var app = express();
app.get("/",(req,res)=>{
    res.end("hello");
});
app.listen(8000);