const path = require('path');
const express = require('express');
const port = 8000;

//firing express server
const app=express();

//setting view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(express.urlencoded());
app.use(express.static('assets'));


//running the server
app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
        
    }
    console.log('Server is Running on Port',port);
});