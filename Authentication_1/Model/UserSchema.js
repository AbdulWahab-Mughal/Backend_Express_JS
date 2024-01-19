const mongoose = require("mongoose");

const AuthenticationSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
});

const AuthenticationModel = mongoose.model("Authentication",AuthenticationSchema)


module.exports=AuthenticationModel;
