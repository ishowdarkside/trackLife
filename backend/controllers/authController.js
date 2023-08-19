const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User"));

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.status(200).json({
    status: "success",
    message: "Signed up successfully!",
  });
});
