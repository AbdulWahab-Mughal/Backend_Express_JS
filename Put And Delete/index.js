const express = require("express");
const app = express();
const PORT = "5000";

app.use(express.json()); // parse requests of content-type - application/json

const DB = [
  {
    id: 1,
    name: "wahab",
    course: "JS",
  },
  {
    id: 2,
    name: "rehman",
    course: "nodejs",
  },
  {
    id: 3,
    name: "sheryar",
    course: "depression",
  },
  {
    id: 4,
    name: "aarish",
    course: "Nothing",
  },
  {
    id: 5,
    name: "faiq",
    course: "cyber",
  },
];

app.put("/api/users/:name", (req, res) => {
  let { name } = req.params;
  // console.log("userName",userName);
  name = name.toLowerCase();
  let filteredUsers = DB.filter((user) => {
    if (user.name === name) {
      user.course = "HTML";

      return user;
    }
  });
  // console.log(filteredUsers);
  if (filteredUsers.length > 0) {
    res.json({
      status: true,
      message: "User Update Successfully!",
      userProfile: { ...filteredUsers[0] },
    });
  } else {
    res.json({
      status: true,
      message: "User Not Found!",
    });
  }
});

app.delete("/api/users/:name", (req, res) => {
  let { name } = req.params;
  let indexOfItem = DB.findIndex(user => user.name === name)
//   console.log("index",indexOfItem);
  if(indexOfItem !== -1){
    DB.splice(indexOfItem, 1);
    res.json({
        status:true,
        message:`UserName ${name} is Deleted Successfully!`,
        data:DB
    })
  }else{
    res.json({
        status:true,
        message:`UserName ${name} is Not Found!`
    })
  }
});

app.listen(PORT, () => {
  console.log("Server Is Running  On Port 5000!");
});
