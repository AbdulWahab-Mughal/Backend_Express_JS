const express = require("express");
const route = express.Router();
const Controllers = require("../controllers/Controllers");

// Testing Api
route.get("/check", Controllers.check);

//SignUp Api
route.post("/signup", Controllers.signup);

//Login
route.post("/login", Controllers.login);

// Add Tasks
route.post("/usertasks", Controllers.addtasks);

//Get All Tasks
route.get("/usertasks", Controllers.getTasks);

//update tasks
route.put("/usertasks", Controllers.updateTasks);

//delete tasks
route.delete("/usertasks/:id", Controllers.deleteTasks);

module.exports = route;
