const express = require("express");
const mongoose = require("mongoose");
const { schema } = require("../models/TasksSchema");
const TasksSchema = require("../models/TasksSchema");
const UsersSchema = require("../models/UsersSchema");




const router = new express.Router();

function variables(model) {
  let schema, againstSchema, againstModel, id, againstId;
  if (model == "tasks") {
    schema = TasksSchema;
    againstSchema = UsersSchema;
    againstModel = "users";
    id = "taskId";
    againstId = "userId";
  } else {
    schema = UsersSchema;
    againstSchema = TasksSchema;
    againstModel = "tasks";
    id = "userId";
    againstId = "taskId";
  }
  const simpleModel = model.slice(0, -1);
  display(model, schema)
  save(model, againstModel, schema, againstSchema, id, simpleModel)
  deleteOne(model,againstModel, schema, againstSchema, id, againstId, simpleModel)
  update(model,schema,id,simpleModel)
  displayAgainst(model,againstModel,againstSchema,simpleModel)
  //return model, againstModel, schema, againstSchema, id, againstId, simpleModel;
}
/*function variables(model) {
  const returnVar={}
  if (model == "tasks") {
    returnVar.schema = TasksSchema;
    returnVar.againstSchema = UsersSchema;
    returnVar.againstModel = "users";
    returnVar.id="taskId";
    returnVar.againstId="userId"

  } else {
    returnVar.schema = UsersSchema;
    returnVar.againstSchema = TasksSchema;
    returnVar.againstModel = "tasks";
    returnVar.id="userId"
    returnVar.againstId="taskId"

  }
  returnVar.simpleModel=model.slice(0,-1)
  return returnVar
}*/
function display(model, schema) {
  router.get("/" + model, async (req, res) => {
    try {
      const array = await schema.find();
      res.send(array);
    } catch (error) {
      res.send(error.message);
    }
  });
}

function save(model, againstModel, schema, againstSchema, id, simpleModel) {
  router.post("/" + model, async (req, res) => {
    try {
      const newOne = new schema(req.body);
      console.log(newOne);

      await newOne.save();
      console.log(newOne);

      try {
        const secondArray = await againstSchema
          .find({[model]:req.body.id})
        if (secondArray.length > 0) {
          for (one of secondArray) {
            const thirdArray = [...one[model], req.body.id];
            await againstSchema.findOneAndUpdate(
              { [id]: one[id] },
              { [model]: thirdArray }
            );
          }
        }
      } catch {}
      try {
        const secondArray = req.body[againstModel];
        for (one of secondArray) {
          const current = await againstSchema.findOne({ [id]: one });
          const thirdArray = [...current[model], req.body.id];
          await againstSchema.findOneAndUpdate(
            { [id]: one },
            { [model]: thirdArray }
          );
        }
        res.send(simpleModel + " added succsesfully");
      } catch (error) {
        console.log(error.message);
        res.send(
          simpleModel +
            " added succsesfully but can`t add " +
            againstModel +
            " for " +
            simpleModel +
            ", " +
            error.message
        );
      }
    } catch (eror) {
      res.send(eror.message);
    }
  });
}

function deleteOne(model,againstModel, schema, againstSchema, id, againstId, simpleModel) {
  router.get("/" + model + "/delete/:id", async (req, res) => {
    try {
      const current = await schema.findOne({ [id]: req.params.id });
      if (current){
      await schema.findOneAndDelete({ [id]: req.params.id });
      try {
        const secondArray = current[againstModel];
        for (one of secondArray) {
          const secondCurrent = await againstSchema.findOne({ [id]: one });
          console.log(secondCurrent[model]);
          const thirdArray = [secondCurrent[model][0]].filter(
            (tas) => tas !== req.params.id
          );

          await againstSchema.findOneAndUpdate(
            { [againstId]: one },
            { [model]: thirdArray }
          );
        }
        res.send(simpleModel + " deleted succsesfully");
      } catch (error) {
        console.log(error.message);
        res.send(
          simpleModel +
            " deleted succsesfully but can`t delete " +
            againstModel +
            " for " +
            simpleModel +
            ", " +
            error.message
        );
      }}
      else{
        res.send(simpleModel+" not found")
      }
    } catch (error) {
      res.send(error.message);
    }
  });
}

function update(model,schema,id,simpleModel) {
  router.post("/" + model + "/:id", async (req, res) => {
    try {
      if (await schema.findOneAndUpdate({ [id]: req.params.id }, req.body)) {
        res.send(simpleModel + " updated succsesfully");
      } else {
        res.send(simpleModel + " not found");
      }
    } catch (error) {
      res.send(error.message);
    }
  });
}

function displayAgainst(model,againstModel,againstSchema,simpleModel) {
  router.get("/" + model + "/:id", async (req, res) => {
    try {
      const secondArray = await againstSchema.findOne({[model]:req.params.id})
      res.send(secondArray);
    } catch {
      res.send(
        "There aren't " +
          againstModel +
          " for this " +
          simpleModel +
          ", " +
          error.message
      );
    }
  });
}
variables("tasks")
variables("users")

router.get("/:idTask/:userId", async (req, res) => {
  try {
    const { idTask, userId } = req.params;
    const currentUser = await UsersSchema.find({ userId });
    if (currentUser.tasks.includes(idTask)) {
      res.send("User " + userId + " has the task number " + idTask);
    } else {
      await UsersSchema.findOneAndUpdate(
        { userId },
        { tasks: [...currentUser.tasks, idTask] }
      );
      res.send("The task number " + idTask + " added yo the user " + userId);
    }
  } catch (error) {
    error.message;
  }
});
module.exports = router;
