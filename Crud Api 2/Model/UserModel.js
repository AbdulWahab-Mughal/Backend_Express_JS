const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  created_on: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = mongoose.model('UserSchema',UserSchema)

//for export
module.exports = UserModel;