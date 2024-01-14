const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./Model/UserSchema");
const PORT = "5000";
const BASE_URI = "mongodb://localhost:27017/MyFirstDB";

app.use(express.json());


//connection of MongoDb 
mongoose
  .connect(BASE_URI)
  .then((res) => {
    console.log("MongoDb Connected Sucessfully");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

//For Testing Api
app.get("/api/checks", (req, res) => {
  res.send("All Good Server Is Running!");
});

app.post("/api/users", (req, res) => {
  const { Name, YourEmail, YourPassword, PhoneNumber } = req.body;
  //   console.log("body:", body);
  if (!Name || !YourEmail || !YourPassword || !PhoneNumber) {
    return res.send("Required Fields Are Empty!");
  }

  // this object is created because the data coming from the UI has Different Key As compare to Schema design in the backend...
  const objToSend = {
    name: Name,
    email: YourEmail,
    password: YourPassword,
    phone: PhoneNumber,
  };
  //.create is used to add one oject in the DB and it is a promise so we use then and catch
  UserModel.create(objToSend)
    .then((response) => {
    //   console.log("UserAdded Successfully");
    res.json({
        status:true,
        message:"User Added Sucessfully !",
        data: response,
    })
    })
    .catch((err) => {
        res.json({
            status:true,
            message:"Internal Server Error !"
        })
    });
});
app.listen(PORT, () => {
  console.log("Server Is Running On Port 5000!");
});
