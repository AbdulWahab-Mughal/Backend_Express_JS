const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created_on:{
    type : Date ,
    defaul: new Date(),
  }
});

const TaskModel = mongoose.model("Tasks",TaskSchema)

module.exports = TaskModel;
