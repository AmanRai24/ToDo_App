const path = require('path');
const express = require('express');
const port = 8000;

const db = require('./config/mongoose');
const Tasks = require('./models/task');
//firing express server
const app=express();

//setting view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/',function(req,res){
    
    Tasks.find({},function(err, task){
        if(err){
            // IF THERE IS ERROR IN FETCHING TASKS
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home',{
            title:'TODO APP',
            todo_list: task
        }
        );


    });
});

var cat;

app.post('/create-task',function(req,res){
    console.log(req.body);
    //IF CATEGORY CHOOSEN IS "" THEN CAT = "EMPTY" WHICH MAKES CATEGORY="EMPTY"
    if(req.body.category=="")
    {
        cat="empty";
    }
    else
    {
        cat=req.body.category;
    }
    // IF NO DATE IS THERE THEN PUT NO DEADLINE
    if(req.body.dueDate==""){
        due="NO DEADLINE";
    }else{
        due=req.body.dueDate;
    }
     Tasks.create({
         description: req.body.description,
         category: cat,
         dueDate: due
     }, function(err,newTask){
         if(err){
             console.log('error in creating a task'); 
             return;
        }
        //NEW TASK IS CREATED
        console.log('*****',newTask);
        return res.redirect('back')
     });
});

// for deleting a contact get query from url and then findIndex
app.get('/delete-task',function(req,res){

    let id = req.query.id;

    // find the contact in the database using id anddelete
    Tasks.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an task in database');
            return;
        }

        return res.redirect('back');

        
    });

    
});

//DELETING MULTIPLE TASKS
app.post('/delete-multiple-tasks', function(req, res) {
    let ids = req.body.task;
    // IF SOMEONE TRIES TO CLICK DELETE BUTTON WITHOUT CHOOSING ANY TASKS THEN REDIRECT BACK SIMPLY
    if(typeof(ids)=='undefined'){
        return res.redirect('back')
    }
    //IF THERE IS ONLY SINGLE TASK CHOOSEN BY USER TO BE DELETED
    if (typeof(ids) == "string") {
        Tasks.findByIdAndDelete(ids, function(err) {
            if (err) { 
                //IF THERE IS ERROR IN DELETING TASK
                console.log("error in deleting in the single task"); 
                return; 
            }
        });
    }//IF THERE ARE MULTIPLE TASKS CHOOSEN TO GET DELETED
     else {  
        for (let i = 0; i < ids.length; i++) {
            Tasks.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    //IF THERE IS ERROR IN DELETING TASK
                    console.log("error in deleting in the multiple tasks");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});

//running the server
app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
        
    }
    console.log('Server is Running on Port',port);
});