const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("../models/TaskSchema");
const UserSchema = require("../models/UserSchema");

const router = new express.Router();

router.get("/users", async (req, res)=>{
    const users= await TaskSchema.find()
    res.send(users)
})

module.exports = router;

