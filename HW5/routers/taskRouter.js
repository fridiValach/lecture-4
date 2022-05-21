const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("../models/TaskSchema");
const UserSchema = require("../models/UserSchema");

const router = new express.Router();

router.get("/tasks", async (req, res)=>{
    const tasks= await TaskSchema.find()
    res.send(tasks)
})

router.post("/tasks", async (req, res)=>{
    const newTask= new TaskSchema(req.body)
    await newTask.save()
    console.log(newTask);

    try {const usersForTask=req.body.users
        usersForTask.forEach(async(el)=>{
            await UserSchema.findOneAndUpdate({userId:el}, {tasks:[...tasks,req.body.description]})
            res.send ("Task added succsesfully")
        })}
    catch {
            res.send ("Task added succsesfully but can`t add users for task")
        }
   
})

router.get("/tasks/delete/:task", async (req, res)=>{
    try{
        await TaskSchema.findOneAndDelete({taskId: req.params.task})
        try{
            req.body.users.forEach(async(el)=>{
                await UserSchema.findOneAndUpdate({userId:el}, {tasks:tasks.filter((task)=>{return task!==req.params.task})})
            })
        }
        catch{
            res.send ("Task deleted succsesfully but can`t delete users for task")

        }
        
        res.send ("Task deleted succsesfully")
        
    }
    catch{
        res.send("eror")
    }
})

router.post("/tasks/:idTask", async (req, res)=>{
   
    try {
        TaskSchema.findOneAndUpdate({idTask:req.params.idTask},req.body)
            res.send ("Task updated succsesfully")
        }
    catch {
            res.send ("eror")
        }
   
})


module.exports = router;

