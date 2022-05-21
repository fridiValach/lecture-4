const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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
        unique:true,
        type:Number, 
        required:true
    },
    users:{
        type:[Number],
        default:[]
    }
})

module.exports = mongoose.model("TaskSchema", TaskSchema);
