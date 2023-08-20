const express = require("express");
const path = require("path");
const { signup, login, verify } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", verify);

module.exports = router;
