const path = require("path");
const bcrypt = require("bcrypt");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const jwt = require("jsonwebtoken");
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

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.username || !req.body.password)
    return next(new AppError(401, "Provide all fields"));
  const user = await User.findOne({ username: req.body.username });
  if (!user) return next(new AppError(401, "Invalid username/password"));
  const compared = await bcrypt.compare(req.body.password, user.password);
  if (!compared) return next(new AppError(401, "Invalid username/password"));
  const token = await generateJWT(user.id);
  return res.status(200).json({
    status: "success",
    message: "Logged in successfully!",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.at(1);
  if (!token) return next(new AppError(401, "Unauthorized, please login!"));
  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return next(new AppError(401, "Invalid token, please login again!"));
    return decoded;
  });
  const user = await User.findById(verified.id);
  if (!user)
    return next(new AppError(401, "User deleted profile, please login again!"));
  req.user = user;
  next();
});

exports.verify = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")?.at(1);
  if (!token) return next(new AppError(401, "Unauthorized, please login!"));
  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return next(new AppError(401, "Invalid token, please login again!"));
    return decoded;
  });
  const user = await User.findById(verified.id).select("-password");
  if (!user)
    return next(new AppError(401, "User deleted profile, please login again!"));

  return res.status(200).json({
    status: "success",
    user,
  });
});
