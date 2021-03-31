//import mongoose library
const mongoose = require('mongoose');

//make connection with db called todo-list-db
mongoose.connect('mongodb://127.0.0.1/todo_list_db');

//fetch connection made earlier to check if it is running or not
const db  = mongoose.connection;

//if error
db.on('error',console.error.bind(console,"error connecting to db."));

//if running
db.once('open',function(){
    console.log("Successfully connected to db");
});