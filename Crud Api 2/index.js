const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const UserModel = require("./Model/UserModel");
const PORT = "5000";
const BASE_URI = "mongodb://localhost:27017/MyFirstDB";

//Connect MongoDb
mongoose
  .connect(BASE_URI)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("err:", err);
  });
//Parser
app.use(express.json());

//what is Cors?  Cross-origin resource sharing (CORS) is an extension of the same-origin policy. You need it for authorized resource sharing with external third parties. For example, you need CORS when you want to pull data from external APIs that are public or authorized.
app.use(cors())

// Testing Api
app.get("/api/checks", (req, res) => {
  res.send("Message: Yeah All Good!");
});
app.post("/api/users", (req, res) => {
  const { Name, YourEmail, YourPassword, PhoneNumber } = req.body;
  // console.log("body:",body);
  if (!Name || !YourEmail || !YourPassword || !PhoneNumber) {
    res.send("Required Fields Are Empty!");
  }
  const objToSend = {
    name: Name,
    email: YourEmail,
    password: YourPassword,
    phone: PhoneNumber,
  };
  UserModel.create(objToSend)
    .then((response) => {
      // console.log("response:",response);
      res.json({
        status: true,
        message: "User Added Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      // console.log("Error: ",err);
      res.json({
        status: true,
        message: "Internal Server Error!",
      });
    });
});
//three methods for Finding data from the MongoDB
//1.find : find used to get all data from the DB
//2.findOne : findOne Is used to Get One entry from the DB
//3.findById: used to get data by Id (Only On Entry from the DB)

//get Request For Getting All Data from The DB
// app.get("/api/users", (req, res) => {
//   const findQuery = {};
//   UserModel.find(findQuery)
//     .then((response) => {
//       // console.log("response:",response);
//       res.json({
//         status: true,
//         message: "User Find Successfully!",
//         data: response,
//       });
//     })
//     .catch((err) => {
//       // console.log("Error: ",err);
//       res.json({
//         status: true,
//         message: "Internal Server Error!",
//       });
//     });
// });

//get Request for Getting specific data by Name from DB
// app.get("/api/users/:name", (req, res) => {
//    let {name} = req.params
//    name = name.toLowerCase();
//   const findQuery = {
//     name,
//    };
//   UserModel.find(findQuery)
//     .then((response) => {
//       // console.log("response:",response);
//       res.json({
//         status: true,
//         message: "User Find Successfully!",
//         data:response
//       });
//     })
//     .catch((err) => {
//       // console.log("Error: ",err);
//       res.json({
//         status: true,
//         message: "Internal Server Error!",
//       });
//     });
// });

//get Request for Getting specific data by id from DB
app.get("/api/users", (req, res) => {
  let { id: _id, name } = req.query;
  const Users = {
    name,
  };
  if (!_id && !name) {
    res.send("Required Id Or Name To find User!");
    return
  }

  if(_id) {
    // console.log("id:",id);
    UserModel.findById(_id)
      .then((response) => {
        // console.log("response:",response);
        res.json({
          status: true,
          message: "User Find Successfully!",
          data: response,
        });
      })
      .catch((err) => {
        // console.log("Error: ",err);
        res.json({
          status: true,
          message: "Internal Server Error!",
        });
      });
  } else if (name) {
    // console.log("name:",name);
    UserModel.find(Users)
      .then((response) => {
        // console.log("response:",response);
        res.json({
          status: true,
          message: "User Find Successfully!",
          data: response,
        });
      })
      .catch((err) => {
        // console.log("Error: ",err);
        res.json({
          status: true,
          message: "Internal Server Error!",
        });
      });
  }
});

//Update Request
/*for Updating We use findByIdAndUpdate(filter, update, {new: true}) 
"it takes 3 parameters 
1st one is Id of the entry which You target to update
2nd the values you want to update 
3rd one is optional used to get the new recored.."*/

app.put("/api/users", (req, res) => {
  let { id: _id, ...data } = req.body;
  //...data is a spread operator used for getting name and email inside a data   object as key value pairs

  // console.log("Id:",_id)
  // console.log("data:",data)
  if (!_id) {
    res.send("Id Must Required!");
  }
  UserModel.findByIdAndUpdate(_id, data)
    .then((response) => {
      // console.log("Response : ", response);
      res.json({
        status: true,
        message: "User Updated Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      // console.error("Err : ");
      res.json({
        status: true,
        message: "Internal Server Error!",
      });
    });
});

/*Delete Request
for delete we used findByIdAndDelete()
*/

app.delete("/api/users/:id", (req, res) => {
  const { id: _id } = req.params;
  // console.log("P:",p);
  if (!_id) {
    res.send("Id required!");
  }
  UserModel.findByIdAndDelete(_id)
    .then((response) => {
      // console.log("Response : ", response);
      res.json({
        status: true,
        message: "User Deleted Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      // console.error("Err :Internal Server ");
      res.json({
        status: true,
        message: "Internal Server Error!",
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
