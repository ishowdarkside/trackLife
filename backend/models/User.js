const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please input first name"],
    validate: {
      validator: function (val) {
        return val.match(/^[a-zA-Z\s]*$/);
      },
      message: "Invalid name",
    },
  },
  lastName: {
    required: [true, "Please input last name"],
    type: String,
    validate: {
      validator: function (val) {
        return val.match(/^[a-zA-Z\s]*$/);
      },
      message: "Invalid last name",
    },
  },
  username: {
    required: [true, "Please input username"],
    type: String,
    validate: {
      validator: function (val) {
        return val.match(/^[a-zA-Z][a-zA-Z0-9_.]{3,15}$/);
      },
      message: "Invalid username",
    },
  },
  password: {
    required: [true, "Please input your password"],
    type: String,
    minlength: [6, "Password must contain at least 6 characters"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
