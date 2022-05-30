const express= require ("express")
const mongoose = require("mongoose");
const TasksSchema = require("./models/TasksSchema");
const UsersSchema = require("./models/UsersSchema");
const taskRouter = require("./routers/taskRouter");
const userRouter = require("./routers/userRouter");
require("dotenv").config();

const app = express();

const port = 3000;

mongoose.connect(
     `mongodb+srv://HW5:HW5@cluster0.vr933.mongodb.net/?retryWrites=true&w=majority`
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
