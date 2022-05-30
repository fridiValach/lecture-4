const mongoose = require("mongoose");
const TasksSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type: Boolean,
        default: false
    },
    taskId:{
        unique:[true, "Such a task already exists"],
        type:Number, 
        required:true
    },
    users:{
        type:[Number],
        //default:[]
    }
});

module.exports = mongoose.model("TasksSchema", TasksSchema);

