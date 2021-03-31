

const express = require('express');

//getting path to set path for static files 
const path = require('path');

//adding port number for server running
const port = 8000;

// include mongoose before firing express app
const db=require('./config/mongoose');

//initializing express server
const app = express();

//include schema(model) for db, use this const to alter my db below
 const Todo = require('./models/todoapp');

//default middleware
app.use(express.urlencoded());

//adding view template ejs
app.set('view engine','ejs');

//joining paths for view
app.set('views',path.join(__dirname,'views'));

//adding static files
app.use(express.static('assets'));

//home page controller
app.get('/',function(req,res){
    Todo.find({},function(err,todo){
        if(err){
            console.log('error',err);
            return;
        }
        return res.render('home',{
            title:"TODO APP",
            todo_list:todo
        });
    });
    //res.render('home',{title:"TODO APP"});
});

//controller to add new list
app.post('/create-todo',function(req,res){
    Todo.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newtodo){
        if(err){
            console.log('error in creating new todo');
            return;
        }
        return res.redirect('back');
    }
    )
});

//delete multiple todos ..controller
app.post('/delete-todo',function(req,res){
    let id = req.body.task;
    //for single item deletion
    if(typeof(id) == "string"){
        Todo.findByIdAndDelete(id,function(err){
            if(err){
                console.log("error in deleting");
                return;
            }
        });
    }
    else{
        //for multiple todos deletion
        for(let i=0;i<id.length;i++)
        {
            Todo.findByIdAndDelete(id[i],function(err){
                if(err){
                    console.log("error in deleting ");
                    return;
                }
            });
        }
    }
    return res.redirect('back');
});

//deletion of single todo
app.get('/delete_todo_single',function(req,res){
    let id=req.query.id;
    Todo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('eror deleting this id');
            return;
        }
        return res.redirect('back');
    });
});

//server
app.listen(port,function(err){
    if(err){console.log('There is problem stating the server :( ');return;}
    console.log('Server started sucessfully!');
});