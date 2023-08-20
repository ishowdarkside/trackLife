const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
      unique: [true, "Username already in use"],
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
  },
  { timestamps: true }
);

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
