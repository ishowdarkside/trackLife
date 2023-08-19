const express = require("express");
const path = require("path");
const { signup } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
