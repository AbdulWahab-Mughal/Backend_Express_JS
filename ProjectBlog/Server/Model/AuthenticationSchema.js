const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
    type: String,
  },
  created_On: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
