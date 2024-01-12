const express = require("express");
const app = express();

//difference between params and query params?
//Both params and query params used to pass data btw server and client but param pass in a structure manner like(http://example.com/users/123) and denoted by colon(:) used req.params and Query pass data in Unstructured manner like(http://example.com/users?name=John) and denoted by (?) used req.query

app.use(express.json());

//Dummy DataBase
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

//params
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let name = id.toLowerCase();
  let filteredUsers = DB.filter((user) => {
    return user.name === name;
  });
  console.log("filteredUsers", filteredUsers);
  if (filteredUsers.length > 0) {
    res.json({
      status: true,
      message: "Users get sucessfully!",
      data: { ...filteredUsers[0] },
    });
  } else {
    res.json({
      status: true,
      message: "User Not Found!",
    });
  }
});
//Query Parameter
app.get("/api/users", (req, res) => {
  let { name } = req.query;
  name = name.toLowerCase();
  let filteredQuery = DB.filter((user) => {
    return user.name === name;
  });
  if (filteredQuery.length > 0) {
    res.json({
      status: true,
      message: "User Find Sucessfully",
      data: { ...filteredQuery[0] },
    });
  }else{
    res.json({
        status: true,
        message: "User not Found"
      });
  }
  // console.log("query",query);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000!");
});
