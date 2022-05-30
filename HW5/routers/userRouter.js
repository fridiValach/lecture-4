const express = require("express");
const mongoose = require("mongoose");
const TasksSchema = require("../models/TasksSchema");
const UsersSchema = require("../models/UsersSchema");

const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await UsersSchema.find();
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/users", async (req, res) => {
  try {
    const newUser = new UsersSchema(req.body);
    console.log(newUser);

    await newUser.save();
    console.log(newUser);

    try {
      const tasksForUser = await TasksSchema.findOne({users:req.body.userId})
      if (tasksForUser.length > 0) {
        for (task of tasksForUser) {
          const usersForTask = [...task.users, req.body.userId];
          await TasksSchema.findOneAndUpdate(
            { taskId: task.taskId },
            { users: usersForTask }
          );
        }
      }
    } catch {}

    try {
      const tasksForUsers = req.body.tasks;
      for (task of tasksForUsers) {
        const currenTtask = await TasksSchema.findOne({ taskId: task });
        const usersForTask = [...currenTtask.users, req.body.userId];
        await TasksSchema.findOneAndUpdate(
          { taskId: task },
          { users: usersForTask }
        );
        console.log(usersForTask);
      }
      res.send("User added succsesfully");
    } catch (error) {
      console.log(error.message);
      res.send("User added succsesfully but can`t add tasks for user");
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/users/delete/:user", async (req, res) => {
  try {
    
    const currentUser = await UsersSchema.findOne({ userId: req.params.user });
    if (currentUser){
    await UsersSchema.findOneAndDelete({ userId: req.params.user });
    try {
      const { tasks } = currentUser;
      console.log("tasks", tasks);
      for (task of tasks) {
        const currenTtask = await TasksSchema.findOne({ taskId: task });
        console.log(currenTtask.users);
        const usersForTask = [currenTtask.users[0]].filter(
          (us) => us !== req.params.user
        );
        console.log(usersForTask);

        await TasksSchema.findOneAndUpdate(
          { taskId: task },
          { users: usersForTask }
        );
      }

      res.send("User deleted succsesfully");
    } catch (error) {
      console.log(error.message);
      res.send(
        "User deleted succsesfully but can`t delete tasks for user, " +
          error.message
      );
    }}
  else{
    res.send("User not found")
  }
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/users/:userId", async (req, res) => {
  try {
    if (
      await UsersSchema.findOneAndUpdate(
        { userId: req.params.userId },
        req.body
      )
    ) {
      res.send("User updated succsesfully");
    } else {
      res.send("User not found");
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const tasksForUser = await TasksSchema.find({
      users: req.params.userId,
    });
    res.send(tasksForUser);
  } catch (error) {
    res.send("There aren't tasks for this user, " + error.message);
  }
});

module.exports = router;
