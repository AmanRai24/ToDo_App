//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/todo_database');

//acquire the connection (to check if it is sucessful)
const db = mongoose.connection;

//error
db.on('Error',console.error.bind(console, 'Error connecting to db'));

//up and running then print the message
db.once('open', function(){
    console.log('Sucessfully connected to the database');
});