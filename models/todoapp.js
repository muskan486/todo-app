
//creating schema using mongoose
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }
})

//creating mongoose model
const Todo =  mongoose.model('todo',schema);

//export this module
module.exports = Todo;