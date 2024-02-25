const express = require("express");
const app = express();
const cors = require("cors");
const PORT = "3000";
const mongoose = require("mongoose");
const route = require("./Routes/routes");
const BASE_URL = "mongodb://localhost:27017/TaskApp";

mongoose
  .connect(BASE_URL)
  .then((res) => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("MongoDB Not Connected! Error");
  });
app.use(express.json());
app.use(cors());

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server Is Running On ${PORT}!`);
});
