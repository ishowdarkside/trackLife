const path = require("path");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User"));
const generateJWT = require(path.join(
  __dirname,
  "..",
  "utilities",
  "generateJWT"
));

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: "success",
    message: "Signed up successfully!",
    token,
  });
});
