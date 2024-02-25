const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/AuthenticationSchema");
const TaskModel = require("../Model/UsersTasksSchema");

const Controllers = {
  check: (req, res) => {
    res.send("Server Is Working Properly!");
  },
  signup: (req, res) => {
    let { name, email, password, phone } = req.body;
    // console.log("data:",data);
    name = name.toLowerCase();
    email = email.toLowerCase();
    if (!name || !email || !password || !phone) {
      return res.json({
        status: "false",
        message: "Required Fields Are Empty!",
      });
    }
    UserModel.findOne({ email })
      .then(async (user) => {
        if (user) {
          return res.json({
            status: "false",
            message: "This Email is Already in Use!",
          });
        } else {
          const encryptedPassword = await bcrypt.hash(password, 10);
          const objToSend = {
            username: name,
            email,
            password: encryptedPassword,
            phone,
          };
          UserModel.create(objToSend)
            .then((User) => {
              // console.log("User", User);
              res.json({
                status: "true",
                message: `${User.username} Registered Successfully!`,
              });
            })
            .catch((err) => {
              res.json({
                status: "false",
                message: "Internal Server Error!",
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: "false",
          message: "Internal Server Error!",
        });
      });
  },
  login: (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    // console.log("data:",data);
    if (!email || !password) {
      return res.json({
        status: "false",
        message: "Email And Password Is Required To Login!",
      });
    }
    UserModel.findOne({ email })
      .then(async (user) => {
        if (!user) {
          return res.json({
            status: "false",
            message:
              "You are not Registered, Go And Registered YourSelf First!",
          });
        } else {
          const IsMatch = await bcrypt.compare(password, user.password);
          if (!IsMatch) {
            return res.json({
              status: "false",
              message: "Invalid Email And Password!",
            });
          } else {
            const tokenObj = {
              ...user,
            };
            const token = jwt.sign(tokenObj, "token");
            return res.json({
              status: "true",
              message: `${user.username} Login Successfully!`,
              token: token,
            });
          }
        }
      })
      .catch((err) => {
        res.json({
          status: "false",
          message: "Internal Server Error Occurs!",
        });
      });
  },
  addtasks: (req, res) => {
    let { title, description, status } = req.body;
    // console.log("tasks:", task);
    if (!title || !description || !status) {
      return res.json({
        status: "false",
        message: "Required Fields Are Empty!",
      });
    }
    const ObjToSend = {
      title,
      description,
      status,
    };
    TaskModel.create(ObjToSend)
      .then((response) => {
        // console.log("response:", response);
        res.json({
          status: "true",
          message: `Your Blog is Added Successfully!`,
          data: response,
        });
      })
      .catch((err) => {
        res.json({
          status: "false",
          message: "Internal Server Error!",
        });
      });
  },
  getTasks: (req, res) => {
    const findQuery = {};
    TaskModel.find(findQuery)
      .then((tasks) => {
        // console.log("task:", tasks);
        res.json({
          status: true,
          message: "All Tasks Fetched Successfully!",
          data: tasks,
        });
      })
      .catch((err) => {
        return res.json({
          status: "false",
          message: "Error In Fetching Data!",
        });
      });
  },
  updateTasks: (req, res) => {
    let { id: _id, ...data } = req.body;
    // console.log("_id:", _id);
    // console.log("data:", data);
    if (!_id) {
      return res.json({
        status: "false",
        message: "Id Is Required To Update Tasks!",
      });
    }
    TaskModel.findByIdAndUpdate(_id, data)
      .then((response) => {
        // console.log("response:", response);
        res.json({
          status: "true",
          message: "Task Updated Successfully",
          data: response,
        });
      })
      .catch((err) => {
        return res.json({
          status: "false",
          message: "User Not Found!",
        });
      });
  },
  deleteTasks: (req, res) => {
    const { id: _id } = req.params;
    // console.log("id:", id);
    if (!_id) {
      res.send("Id required To Delete!");
    }
    TaskModel.findByIdAndDelete(_id)
      .then((response) => {
        // console.log("Response : ", response);
        res.json({
          status: "true",
          message: "Task Deleted Successfully!",
          data: response,
        });
      })
      .catch((err) => {
        // console.error("Err :Internal Server ");
        res.json({
          status: "false",
          message: "Internal Server Error!",
        });
      });
  },
};

module.exports = Controllers;
