const express = require("express");
const mongoose = require("mongoose");
const TasksSchema = require("../models/TasksSchema");
const UsersSchema = require("../models/UsersSchema");

const router = new express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await TasksSchema.find();
    res.send(tasks);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const newTask = new TasksSchema(req.body);
    console.log(newTask);

    await newTask.save();
    console.log(newTask);

    try {
      const usersForTask = await UsersSchema.where("tasks").includes(
        req.body.taskId
      );
      if (usersForTask.length > 0) {
        for (user of usersForTask) {
          const tasksForUser = [...user.tasks, req.body.taskId];
          await UsersSchema.findOneAndUpdate(
            { userId: user.userId },
            { tasks: tasksForUser }
          );
        }
      }
    } catch {}
    try {
      const usersForTask = req.body.users;
      for (user of usersForTask) {
        const currentUser = await UsersSchema.findOne({ userId: user });
        const tasksForUser = [...currentUser.tasks, req.body.taskId];
        await UsersSchema.findOneAndUpdate(
          { userId: user },
          { tasks: tasksForUser }
        );
      }
      res.send("Task added succsesfully");
    } catch (error) {
      console.log(error.message);
      res.send(
        "Task added succsesfully but can`t add users for task, " + error.message
      );
    }
  } catch (eror) {
    res.send(eror.message);
  }
});

router.get("/tasks/delete/:task", async (req, res) => {
  try {
    const currentTask = await TasksSchema.findOne({ taskId: req.params.task });
    if (currentTask){
    await TasksSchema.findOneAndDelete({ taskId: req.params.task });
    try {
      const { users } = currentTask;
      for (user of users) {
        const currenTuser = await UsersSchema.findOne({ userId: user });
        console.log(currenTuser.tasks);
        const tasksForUser = [currenTuser.tasks[0]].filter(
          (tas) => tas !== req.params.task
        );

        await UsersSchema.findOneAndUpdate(
          { userId: user },
          { tasks: tasksForUser }
        );
      }
      res.send("Task deleted succsesfully");
    } catch (error) {
      console.log(error.message);
      res.send(
        "Task deleted succsesfully but can`t delete users for task, " +
          error.message
      );
    }}
    else{
        res.send("Task not found")
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/tasks/:idTask", async (req, res) => {
  try {
    if (
      await TasksSchema.findOneAndUpdate(
        { taskId: req.params.taskId },
        req.body
      )
    ) {
      res.send("Task updated succsesfully");
    } else {
      res.send("Task not found");
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/tasks/:idTask", async (req, res) => {
  try {
    const usersForTask = await UsersSchema.find({tasks:req.params.taskId
    })
    res.send(usersForTask);
  } catch (error){
    res.send("There aren't users for this task, " + error.message);
  }
});

router.get("/:idTask/:userId", async (req, res) => {
    const { idTask, userId } = req.params;
    const currentUser = await UsersSchema({ userId });
    console.log(currentUser);

  try {
    
    if (currentUser.tasks.includes(idTask)) {
      res.send("User " + userId + " has the task number " + idTask);
    } else {
      await UsersSchema.findOneAndUpdate(
        { userId },
        { tasks: [...currentUser.tasks, idTask] }
      );
      console.log(currentUser);

      res.send("The task number " + idTask + " added to the user " + userId);
    }
  } catch (error) {
      console.log(error);
      res.send(error.message)
  }
});
module.exports = router;
