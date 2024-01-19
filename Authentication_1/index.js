const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const AuthenticationModel = require("./Model/UserSchema");
const PORT = "5000";
const BASE_URI = "mongodb://localhost:27017/MyFirstDB";

mongoose
  .connect(BASE_URI)
  .then((res) => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB.", err);
  });

app.use(cors());
app.use(express.json());

//testing
app.get("/api/checks", (req, res) => {
  res.send({ message: "All Good!" });
});

//Authentication for SignUp
app.post("/api/signup", (req, res) => {
  let { name: username, email, password, phone } = req.body;
  // console.log("body:",body);
  username = username.toLowerCase();
  email = email.toLowerCase();

  if (!username || !email || !password || !phone) {
    return res.json({ message: "Required Fields Are Empty!" });
  }
  AuthenticationModel.findOne({ email })
    .then(async (user) => {
      if (user) {
        // console.log("Email Already In Used!");
        return res.json({ message: "Email Already In Used!" });
      } else {
        let encryptedPassword = await bcrypt.hash(password, 10);
        // console.log("pass:",password);
        // console.log("encrypted:",encryptedPassword)
        const objToSend = {
          username,
          email,
          password: encryptedPassword,
          phone,
        };
        AuthenticationModel.create(objToSend)
          .then((response) => {
            // console.log("User Added:",response);
            res.json({
              status: true,
              message: `${response.username} Signed Up Successfully!`,
            });
          })
          .catch((err) => {
            //   console.log("Internal server error!");
            res.json({
              status: false,
              message: `Internal Server Error`,
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "Something went wrong!",
      });
    });
});

//Authentication for LogIn
app.post("/api/login", (req, res) => {
  let { email, password } = req.body;
  // console.log("body:",body);
  if (!email || !password) {
    return res.json({ message: "Email And Password Is Required!" });
  }
  AuthenticationModel.findOne({ email })
    .then(async (user) => {
      if (!user) {
        // console.log("Go And Reqister Yourself First!");
        return res.json({
          message: `No User Found!  Go And Reqister Yourself First!`,
        });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log("isMatch:", isMatch);
        if (!isMatch) {
          res.json({
            status: false,
            message: "Email and Password Is Incorrect!",
          });
        } else {
          res.json({
            status: true,
            message: `${user.username} Login Successfully!`,
          });
        }
      }
    })
    .catch((err) => {
      // console.log("Error In Finding User");
      res.json({
        status: false,
        message: "Server Error",
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server Is Running On Port ${PORT}!`);
});
